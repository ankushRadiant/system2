const { mongoose } = require('mongoose');
const QuizAttempt = require('../models/quizAttemptModel');
const User = require('../models/userModel');
const Quiz = require('../models/quizModel');




const quizAttempt = async (req, res) => {

    try {
        const { user, quiz, answers, completedAt } = req.body;
        if (!user || !quiz || !answers) {
            return res.send({
                'msg':'User, quiz, and answers are required.',
                'status':400,
            });
        }

        const existingUser = await User.findById(user);
        const existingQuiz = await Quiz.findById(quiz);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (!existingQuiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        const quizQuestions = existingQuiz.questions.map(question => question._id.toString());
        for (const answer of answers) {
            const { question: questionId } = answer;
            if (!quizQuestions.includes(questionId)) {
                return res.send({
                    'msg':`Question with ID ${questionId} is not associated with the specified quiz.`,
                    'status':400,
                });
                
            }
        }
        
        const quizAttempt = new QuizAttempt({user, quiz, answers, completedAt });

        const response = await quizAttempt.save();

        if(response){
            return res.send({
                'msg':'Quiz attempt created successfully..',
                'status':200,
                'response':response
            });
        }

    } catch (err) {
        console.error(err);
        return res.send({
            'msg':err.message,
            'status':500,
        });
    }
}


const quizAttemptResult = async (req, res) => {
    try {
        const { userId } = req.query;
        const quizAttempts = await QuizAttempt.find({ user: userId }).populate('quiz').exec();

        if (!quizAttempts || quizAttempts.length === 0) {
            return res.status(404).json({ message: 'No quiz attempts found for the specified user.' });
        }

        const results = quizAttempts.map(attempt => {
            const { quiz, answers, startedAt, completedAt } = attempt;
            const { name: quizName, questions } = quiz;

            let score = 0;
            let correctAnswers = 0;
            let incorrectAnswers = 0;

            for (const answer of answers) {
                const { question, selectedOption } = answer;
                const questionData = questions.find(q => q._id.toString() === question.toString());

                if (!questionData) {
                    console.error(`Question with ID ${question} not found in the quiz.`);
                    continue;
                }

                if (questionData.answerIndex === selectedOption) {
                    score++;
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }
            }
            
            // Calculate time taken (in milliseconds)
            const time = new Date(completedAt).getTime() - new Date(startedAt).getTime();
            const timeTaken = time / 1000;

            return {
                quizName,
                score,
                correctAnswers,
                incorrectAnswers,
                timeTaken
            };
        });
        if(results){
            return res.send({
                'msg':'Quiz Result successfully.',
                'status':200,
                'response':results
            });
        }

        
    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
    }


}







module.exports = { quizAttempt, quizAttemptResult };

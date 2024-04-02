const { mongoose } = require('mongoose');
const Quiz = require('../models/quizModel');
const jwt = require('jsonwebtoken');
const { Pagination } = require('../helpers/paginantion');
const { getFilter } = require('../helpers/filter');
const { quizValidation } = require('../validations/quizValidation');

/////////////////////  Create Quiz name
const createQuiz = async (req, res) => {

    try {
        const {error} = quizValidation.validate(req.body);
        if (error) {
            return res.send({
                'msg':error.details[0].message,
                'status':400
            });
        }
        const { name, instructions, isEnabled, questions, duration } = req.body;
        const quiz = new Quiz({ 
            name,
            instructions,
            isEnabled,
            questions,
            duration
        });
        let quizExist = await Quiz.findOne({ $or: [{ name } ] })

        if (quizExist) {
            return res.json({'message': `This ${name} already exists`,'status':400});
        }
        
        const response = await quiz.save();
        if(response){
            return res.send({
                'msg':'Quiz create successfully.',
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

/////////////  Permission list /////////////////

//http://localhost:3000/permission/index?page=1&limit=10&status=all&search=edit&sortBy=permissionName&sortOrder=asc
//http://localhost:3000/permission/index?page=1&limit=10&status=all&search=&sortBy=permissionName&sortOrder=asc

const index  = async (req, res) => {

    try {
        const options = ["name"];
        let filter = getFilter(req, options);
        const { page, limit, skip, sortOrder } = Pagination(req);
        let query = filter ? filter.query : {};

        const totalCounts = await Quiz.countDocuments(query);
        const totalPages = Math.ceil(totalCounts / limit);

        const allQuiz = await Quiz.find(query)
        .sort(sortOrder)
        .skip(skip)
        .limit(limit);
        return res.send({
            'msg':'Quiz data fetch successful!',
            'status':200,
            'pages':page,
            'totalCounts':totalCounts,
            'totalPages':totalPages,
            'data':allQuiz
        });

    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
        
    }

}

/////////////  Edit EditQuiz section ////////////////

const EditQuiz = async (req, res ) => {
    try {
        const {id} = req.query;
        const response = await Quiz.findOne({ _id: id})
        if(response){
            return res.send({
                'msg':'Feature fetch successfully using id.',
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

const updateQuiz = async (req, res) => {
    try {
        const {id} = req.query;
        const { name, instructions, isEnabled, questions, duration }  = req.body;
        const filter = { _id: id };
        const update = { 
            name: name,
            instructions: instructions,
            isEnabled: isEnabled,
            questions: questions,
            duration: duration
        };
        const response = await Quiz.findOneAndUpdate(filter, update, {
            new: true,
        });
        if(response){
            return res.send({
                'msg':'Quiz update successfully using id.',
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

const deleteQuiz = async (req, res) => {
    try {
        const {id} = req.query;
        const response  = await Quiz.deleteOne({ _id: id });

        if (response.deletedCount > 0) {
            return res.send({
                'msg': 'Quiz Deleted Successfully.',
                'status': 200,
                'response': response
            });
        } else {
            return res.send({
                'msg': 'No quiz found with the provided ID.',
                'status': 404
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



module.exports = { createQuiz, index, EditQuiz, updateQuiz, deleteQuiz };

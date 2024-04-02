const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizAttemptSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    answers: [{
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        selectedOption: {
            type: Number
        }
    }],
    score: {
        type: Number,
        default: 0
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);

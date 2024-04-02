const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const optionSchema = new Schema({
    option: {
        type: String,
        required: true
    }
});


const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [optionSchema],
    answerIndex: {
        type: Number,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    explanation:{
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


const quizSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    instructions: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    questions: [questionSchema],
    duration: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Quiz', quizSchema);

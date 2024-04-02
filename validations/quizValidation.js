const Joi = require('joi');


const customMessages = {
    'string.base': '{#label} must be a string',
    'string.empty': '{#label} cannot be empty',
    'any.required': '{#label} is required',
    'array.base': '{#label} must be an array',
    'array.empty': '{#label} cannot be empty',
    'number.base': '{#label} must be a number',
    'boolean.base': '{#label} must be a boolean'
};

const quizCreationSchema = Joi.object({
    name: Joi.string().required().messages(customMessages),
    instructions: Joi.string().required().messages(customMessages),
    isEnabled: Joi.boolean().default(true).messages(customMessages),
    questions: Joi.array().items(
        Joi.object({
            question: Joi.string().required().messages(customMessages),
            answers: Joi.array().items(
                Joi.object({
                    option: Joi.string().required().messages(customMessages)
                })
            ).required().messages(customMessages),
            answerIndex: Joi.number().required().messages(customMessages),
            isEnabled: Joi.boolean().default(true).messages(customMessages),
            explanation: Joi.string().default("").messages(customMessages)
        })
    ).required().messages(customMessages),
    duration: Joi.number().default(0).messages(customMessages)
});

module.exports = {
    quizCreationSchema,
};

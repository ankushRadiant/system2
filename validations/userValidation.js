const Joi = require('joi');

const registrationSchema = Joi.object({
    first_name: Joi.string().required().messages({
        'string.empty': 'Fisrt Name is required.',
    }),
    last_name: Joi.string().required().messages({
        'string.empty': 'Last Name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least {#limit} characters long.',
    }),
    username: Joi.string().required().messages({
        'string.empty': 'Username is required.',
    }),
    phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Accept 10-digit numeric phone numbers
    .optional()
    .allow('')
    .messages({
        'string.pattern.base': 'Phone number must be a 10-digit numeric value.',
    }),
    
    user_status: Joi.string(),
    user_role: Joi.string().required().messages({
        'string.empty': 'UserRole is required.',
    }),
    active: Joi.boolean()
});

module.exports = {
    registrationSchema,
}
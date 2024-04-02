const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone: {
        type: String,
        trim: true,
    },
    
    user_status: {
        type: String,
        enum: ['approved', 'pending'],
        default: 'approved',
    },
    
    user_role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true,
    },
    
    active: {
        type: Boolean,
        default: true
    }
    
},
    {
        timestamps: true
    },
);

module.exports = mongoose.model('User', userSchema);
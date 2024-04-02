const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    },
);

module.exports = mongoose.model('Role', roleSchema);
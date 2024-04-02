const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionName: {
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

module.exports = mongoose.model('Permission', permissionSchema);
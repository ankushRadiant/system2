const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    userAssigned: {
        type: Number,
        default: 0,
    },
    features: [
        {
            featureName: {
                type: String,
                required: true,
            },
            enabled: {
                type: Boolean,
            },
            subFeatures: [
                {
                    subFeatureName: {
                        type: String,
                        required: true,
                    },
                    enabled: {
                        type: Boolean,
                    },
                    permissions: [
                        {
                            permissionId: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'Permission',
                                required: true,
                            },
                            enabled: {
                                type: Boolean,
                            },
                        },
                    ],
                },
            ],
        },
    ],
},
{
    timestamps: true,
});

const UserRoleModel = mongoose.model('UserRole', userRoleSchema);
module.exports = UserRoleModel;

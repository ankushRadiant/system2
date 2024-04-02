const UserRole = require('../models/userRolesModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/keys");
const { registrationSchema } = require('../validations/userValidation');
const { Pagination } = require('../helpers/paginantion');
const { getFilter } = require('../helpers/filter');


async function createUserRole(req, res) {

    try {
        
        const { roleId, userAssigned, features } = req.body;
        const rolename = new UserRole({ roleId, userAssigned, features });
        
        rolename.features.forEach((feature) => {
            feature.enabled = true;

            feature.subFeatures.forEach((subFeature) => {
                subFeature.enabled = true;

                subFeature.permissions.forEach((permission) => {
                    permission.enabled = true;
                });
            });
        });
        
    
        let roleExist = await UserRole.findOne({ $or: [{ roleId } ] })

        if (roleExist) {
            return res.json({'message': `This ${roleId} already exists`,'status':400});
        }
        
        const response = await rolename.save();
        if(response){
            return res.send({
                'msg':'User Role create successfully.',
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

const userRoleList = async (req, res) => {

    try {                                                   
        const options = ["roleName"];
        let filter = getFilter(req, options);
        const { page, limit, skip, sortOrder } = Pagination(req);
        let query = filter ? filter.query : {};

        if (req.query.roleId) {
            query.roleId = req.query.roleId;
        }

        const totalCounts = await UserRole.countDocuments(query);
        const totalPages = Math.ceil(totalCounts / limit);
        
        const allResult = await UserRole.find(query)
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .populate([
            { path: 'roleId', select: '_id roleName status' },
            { path: 'features.subFeatures.permissions.permissionId', select: '_id permissionName status' },
        ])
        .lean();
        
        return res.send({
            'msg':'User Roles data Fetch successfully!',
            'status':200,
            'pages':page,
            'totalCounts':totalCounts,
            'totalPages':totalPages,
            'data':allResult
        });

    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
        
    }
}

module.exports = { createUserRole, userRoleList };
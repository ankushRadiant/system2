const { mongoose } = require('mongoose');
const Permission = require('../models/permissionModel');
const jwt = require('jsonwebtoken');
const { Pagination } = require('../helpers/paginantion');
const { getFilter } = require('../helpers/filter');

/////////////////////  Create Permission name
const createPermission = async (req, res) => {

    try {
        const { permissionName } = req.body;
        const permission = new Permission({ permissionName });
        let permissionExist = await Permission.findOne({ $or: [{ permissionName } ] })

        if (permissionExist) {
            return res.json({'message': `This ${permissionName} already exists`,'status':400});
        }
        const response = await permission.save();
        if(response){
            return res.send({
                'msg':'Permission create successfully.',
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
        const options = ["permissionName"];
        let filter = getFilter(req, options);
        const { page, limit, skip, sortOrder } = Pagination(req);
        let query = filter ? filter.query : {};

        const totalCounts = await Permission.countDocuments(query);
        const totalPages = Math.ceil(totalCounts / limit);

        const allPermission = await Permission.find(query)
        .sort(sortOrder)
        .skip(skip)
        .limit(limit);
        return res.send({
            'msg':'Permission data fetch successful!',
            'status':200,
            'pages':page,
            'totalCounts':totalCounts,
            'totalPages':totalPages,
            'data':allPermission
        });

    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
        
    }

}

/////////////  Edit Permission section ////////////////

const EditPermission = async (req, res ) => {
    try {
        const {id} = req.query;
        const response = await Permission.findOne({ _id: id})
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

const updatePermission = async (req, res) => {
    try {
        const {id} = req.query;
        const { permissionName } = req.body;
        const filter = { _id: id };
        const update = { permissionName: permissionName };
        const response = await Permission.findOneAndUpdate(filter, update, {
            new: true,
        });
        if(response){
            return res.send({
                'msg':'Permission update successfully using id.',
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

const deletePermission = async (req, res) => {
    try {
        const {id} = req.query;
        const response  = await Permission.deleteOne({ _id: id });
        if(response){
            return res.send({
                'msg':'Permission Delete Successfully.',
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

module.exports = { createPermission, index, EditPermission, updatePermission, deletePermission};

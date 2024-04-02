const { mongoose } = require('mongoose');
const Role = require('../models/roleModel');
const jwt = require('jsonwebtoken');
const { Pagination } = require('../helpers/paginantion');
const { getFilter } = require('../helpers/filter');

/////////////////////  Create Roles name
async function createRole(req, res) {

    try {
        const { roleName } = req.body;
        const role = new Role({ roleName });
        let roleExist = await Role.findOne({ $or: [{ roleName } ] })

        if (roleExist) {
            return res.json({'message': `This ${roleName} already exists`,'status':400});
        }
        const response = await role.save();
        if(response){
            return res.send({
                'msg':'Role create successfully.',
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

/////////////  Role list /////////////////

const index  = async (req, res) => {

    try {
        const options = ["roleName"];
        let filter = getFilter(req, options);
        const { page, limit, skip, sortOrder } = Pagination(req);
        let query = filter ? filter.query : {};

        const totalCounts = await Role.countDocuments(query);
        const totalPages = Math.ceil(totalCounts / limit);
        const allRole = await Role.find(query)
        .sort(sortOrder)
        .skip(skip)
        .limit(limit);
        return res.send({
            'msg':'Fetch data successful!',
            'status':200,
            'pages':page,
            'totalCounts':totalCounts,
            'totalPages':totalPages,
            'data':allRole
        });

    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
        
    }

}

/////////////  Edit section ////////////////

const EditRole = async (req, res ) => {
    
    try {
        const {id} = req.query;
        const response = await Role.findOne({ _id: id})
        if(response){
            return res.send({
                'msg':'Role fetch successfully using id.',
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

const updateRole = async (req, res) => {
    try {
        const {id} = req.query;
        const { roleName } = req.body;
        const filter = { _id: id };
        const update = { roleName: roleName };
        const response = await Role.findOneAndUpdate(filter, update, {
            new: true,
        });
        if(response){
            return res.send({
                'msg':'Role update successfully using id.',
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

const deleteRole = async (req, res) => {
    try {
        const {id} = req.query;
        const response  = await Role.deleteOne({ _id: id });
        if(response){
            return res.send({
                'msg':'Role Delete Successfully.',
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

module.exports = { createRole, index, EditRole, updateRole, deleteRole};

const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/keys");
const { registrationSchema } = require('../validations/userValidation');
const { Pagination } = require('../helpers/paginantion');
const { getFilter } = require('../helpers/filter');


const registerUser = async (req, res) => {

    // console.log('jai shree ram'); 
    console.log(req.body);

    try {
        const { error } = registrationSchema.validate(req.body);
        if (error) {
            return res.send({
                'msg':error.details[0].message,
                'status':400
            });
        }
        const { 
            first_name, 
            last_name, 
            email, 
            username, 
            password, 
            phone, 
            user_status, 
            user_role,
            active 
        } = req.body;
        let userExist = await User.findOne({ $or: [{ username }, { email }] })

        if (userExist) {
            return res.json({'message': 'User already exists','status':400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            first_name, 
            last_name, 
            email, 
            username, 
            password: hashedPassword, 
            phone, 
            user_status, 
            user_role,
            active 
        });
        const response = await user.save();
        if(response){
            return res.json({
                'msg':'User registered successfully.',
                'status':200,
                'response':response
            });
        }

    } catch (err) {
        console.error(err);
        return res.json({
            'msg':err.message,
            'status':500,
        });
    }
}


//////////////// User update 
const EditUser = async (req, res ) => {
    try {
        const {id} = req.query;
        const response = await User.findOne({ _id: id})
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


//////////////// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const { 
            first_name, 
            last_name, 
            email, 
            username, 
            password, 
            phone, 
            user_status, 
            user_role,
            active  
        } = req.body;

        const filter = { _id: id };
        const update = { 
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password,
            phone: phone,
            user_status: user_status,
            user_role:user_role,
            active: active
        };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            update.password = hashedPassword;
        }

        const response = await User.findOneAndUpdate(filter, update, {
            new: true,
        });

        if (response) {
            return res.send({
                'msg': 'User updated successfully.',
                'status': 200,
                'response': response
            });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            'msg': err.message,
            'status': 500,
        });
    }
}



const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) {
            return res.status(401).json({'msg':'Invalid username or password', 'status':401});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({'msg':'Invalid username or password', 'status':401});
        }

        if(user.user_status == 'pending') {
            return res.status(401).json({ 'msg': 'Your account request is pending.', 'status': 401});
        }

        const payload = { email: email}
        const now = new Date();
        const expiresIn = Math.floor(now.getTime() / 1000) + 3600;  // 1 hour expiration
        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
        
        return res.json({
            'msg':'Login successful!',
            'status':200,
            'details' : {
                'first_name': user.first_name,
                'last_name' : user.last_name,
                'email'     : user.email,
                'phone'     : user.phone,
                'user_status' : user.user_status,
                'role'      : user.role,
                'permissions' : user.permissions,
                'token' : token
            }
            
        });
    } catch (err) {
        console.error(err);
        return res.json({
            'msg':err.message,
            'status':500,
        });
    }
    
}


//http://localhost:3000/user/index?page=1&limit=10&status=all&search=ankush&sortBy=first_name&sortOrder=asc

const userList = async (req, res) => {

    try {
        const options = ['first_name'];
        let filter = getFilter(req, options);
        const { page, limit, skip, sortOrder } = Pagination(req);
        let query = filter ? filter.query : {};

        const totalCounts = await User.countDocuments(query);
        const totalPages = Math.ceil(totalCounts / limit);

        const allUsers = await User.find(query)
        .sort(sortOrder)
        .skip(skip)
        .limit(limit);
        res.json({
            'msg':'User data fetch successfully!',
            'status':200,
            'pages':page,
            'totalCounts':totalCounts,
            'totalPages':totalPages,
            'data':allUsers
        });
    } catch (error) {
        console.error(error);
        res.json({
            'msg':error.message,
            'status':500,
        });
    }
}

const logOut = async (req, res) => {

    const tokenBlacklist = [];
    try {
        const { token } = req.headers
        console.log(token);
        if (token) {
            tokenBlacklist.push(token); 
            return res.json({
                'msg':'Logout successfully!',
                'status':200
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            'msg':error.message,
            'status':500,
        });
    }
    
}

module.exports = { registerUser, loginUser, userList, logOut, EditUser, updateUser };

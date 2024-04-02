const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const  authMiddleware  = require('../middleware/auth');
// const { checkRole, checkPermission } = require('../middleware/authorization');

router.post('/register', userController.registerUser);
router.get('/login', userController.loginUser);
router.get('/index', authMiddleware.auth, userController.userList);
router.get('/edit', authMiddleware.auth, userController.EditUser);
router.put('/update', authMiddleware.auth, userController.updateUser);
// router.get('/index', authMiddleware.auth, checkRole('admin'), checkPermission('index'), userController.userList);
router.post('/logout', authMiddleware.auth, userController.logOut);


module.exports = router;
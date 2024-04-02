const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

const  authMiddleware  = require('../middleware/auth');

router.post('/create',  authMiddleware.auth, userRoleController.createUserRole);
router.get('/index', authMiddleware.auth,  userRoleController.userRoleList);
// router.get('/edit', authMiddleware.auth, roleController.EditRole);
// router.put('/update', authMiddleware.auth, roleController.updateRole);
// router.put('/update', authMiddleware.auth, roleController.updateRole);
// router.delete('/delete', authMiddleware.auth, roleController.deleteRole);

module.exports = router;
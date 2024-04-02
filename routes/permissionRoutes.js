const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

const  authMiddleware  = require('../middleware/auth');

router.post('/create', authMiddleware.auth, permissionController.createPermission);
router.get('/index',  authMiddleware.auth, permissionController.index);
router.get('/edit',  authMiddleware.auth, permissionController.EditPermission);
router.put('/update', authMiddleware.auth, permissionController.updatePermission);
router.put('/update', authMiddleware.auth, permissionController.updatePermission);
router.delete('/delete', authMiddleware.auth, permissionController.deletePermission);

module.exports = router;
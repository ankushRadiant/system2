const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

const  authMiddleware  = require('../middleware/auth');

router.post('/create',  authMiddleware.auth, roleController.createRole);
router.get('/index', authMiddleware.auth,  roleController.index);
router.get('/edit', authMiddleware.auth, roleController.EditRole);
router.put('/update', authMiddleware.auth, roleController.updateRole);
router.put('/update', authMiddleware.auth, roleController.updateRole);
router.delete('/delete', authMiddleware.auth, roleController.deleteRole);

module.exports = router;
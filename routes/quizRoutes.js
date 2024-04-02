const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

const  authMiddleware  = require('../middleware/auth');

router.post('/create', authMiddleware.auth, quizController.createQuiz);
router.get('/index',  authMiddleware.auth, quizController.index);
router.get('/edit',  authMiddleware.auth, quizController.EditQuiz);
router.put('/update', authMiddleware.auth, quizController.updateQuiz);
router.delete('/delete', authMiddleware.auth, quizController.deleteQuiz);

module.exports = router;
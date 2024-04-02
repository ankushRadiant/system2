const express = require('express');
const router = express.Router();
const quizAttemptController = require('../controllers/quizAttemptController');

const  authMiddleware  = require('../middleware/auth');

router.post('/attempt', authMiddleware.auth, quizAttemptController.quizAttempt);
router.get('/quiz-result', authMiddleware.auth, quizAttemptController.quizAttemptResult);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/useControllers');

router.post('/register', userController.registerUser);
router.post('/verify', userController.verifyEmail);
router.post('/tap', userController.tap);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;

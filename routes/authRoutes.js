const express = require('express');
const router = express.Router();
const {registerUser,activateUser,loginUser,forgotPassword,resetPassword, getUser} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');


// Register a new user
router.post('/register', registerUser);
// Activate user account
router.get('/activate/:token', activateUser);
// Login user
router.post('/login', loginUser);
// Forgot password
router.post('/forgot-password', forgotPassword);
// Reset password
router.post('/reset-password/:token', resetPassword);
// Get user profile
router.get('/profile', protect, getUser);


module.exports = router;
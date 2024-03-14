const express = require('express');
const {
  registerUser,
  loginUser,
  verifyOTP,
} = require('../controllers/authController');

const authRouter = express.Router();

// Register User
authRouter.post('/register', registerUser);

// Verify OTP
authRouter.post('/verify-otp', verifyOTP);

// Login User
authRouter.post('/login', loginUser);

module.exports = authRouter;

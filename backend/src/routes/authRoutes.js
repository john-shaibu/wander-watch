const express = require('express');
const {
  registerUser,
  loginUser,
  verifyOTP,
  resendVerificationCode,
} = require('../controllers/authController');

const authRouter = express.Router();

// Register User
authRouter.post('/register', registerUser);

// Verify OTP
authRouter.post('/verify-otp', verifyOTP);

// Resend Verification OTP
authRouter.get('/resend-verify-otp', resendVerificationCode);


// Login User
authRouter.post('/login', loginUser);

module.exports = authRouter;

const express = require('express');
const {
  registerUser,
  loginUser,
  verifyOTP,
  resendVerificationCode,
  pingLogin,
  logoutUser
} = require('../controllers/authController');
const { loggedInMidddleware } = require('../middlewares/authMiddlewares');

const authRouter = express.Router();

// Register User
authRouter.post('/register', registerUser);

// Verify OTP
authRouter.post('/verify-otp', verifyOTP);

// Resend Verification OTP
authRouter.get('/resend-verify-otp', resendVerificationCode);


// Login User
authRouter.post('/login', loginUser);

authRouter.get('/', loggedInMidddleware, pingLogin)

authRouter.post('/logout', logoutUser);

module.exports = authRouter;

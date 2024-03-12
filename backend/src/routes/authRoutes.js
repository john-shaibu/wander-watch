const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController');

const authRouter = express.Router()

// Register User
authRouter.post('/register', registerUser)

// Login User
authRouter.post('/login', loginUser)

module.exports = authRouter
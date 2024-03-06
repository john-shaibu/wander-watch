const express = require('express')
const { registerUser, loginUser, updatePassword, updateUser } = require('../controllers/userController')
const { verifyToken } = require('../middlewares/jwt')

const userRouter = express.Router()

// Register User
userRouter.post('/register', registerUser)

// Login User
userRouter.post('/login', loginUser)

// Update User without password
userRouter.put('/update', verifyToken, updateUser)

// Update User password
userRouter.put('/update-password', updatePassword)

module.exports = userRouter
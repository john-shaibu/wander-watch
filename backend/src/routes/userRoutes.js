const express = require('express')
const { register_user } = require('../controllers/userController')

const userRouter = express.Router()

// Register User
userRouter.post('/register', register_user)

module.exports = userRouter
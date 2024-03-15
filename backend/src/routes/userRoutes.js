const express = require('express');
const {
  updatePassword,
  updateUser,
  userMetrics,
  discover,
} = require('../controllers/userController');
const { loggedInMidddleware } = require('../middlewares/authMiddlewares');


const userRouter = express.Router();

// Update User without password
userRouter.put('/update', loggedInMidddleware, updateUser);

// Update User password
userRouter.put('/update-password', loggedInMidddleware, updatePassword);

// metrics
// userRouter.get('/metrics', userMetrics);

// discover
// userRouter.get('/discover', discover)

module.exports = userRouter;

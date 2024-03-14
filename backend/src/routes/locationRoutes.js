const express = require('express');
const locationRouter = express.Router();
const { verifyToken } = require('../middlewares/jwt');
const createLocation = require('../controllers/createLocation');
const getLocation = require('../controllers/getLocationHistory');

// Create a new location
locationRouter.post('/', verifyToken, createLocation);

// Get location history
locationRouter.get('/', verifyToken, getLocation);

module.exports = locationRouter;

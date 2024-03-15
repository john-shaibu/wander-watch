const express = require('express');
const locationRouter = express.Router();
const createLocation = require('../controllers/createLocation');
const getLocations = require('../controllers/getLocationHistory');
const { loggedInMidddleware } = require('../middlewares/authMiddlewares');

// Create a new location
locationRouter.post('/', loggedInMidddleware, createLocation);

// Get location history
locationRouter.get('/', loggedInMidddleware, getLocations);

module.exports = locationRouter;

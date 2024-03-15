const expressAsyncHandler = require('express-async-handler');
const { AppError } = require('../utils/AppErrors');

// Fetch current user location using geolocation API and store location
const createLocation = expressAsyncHandler(async (req, res) => {
  const { name, latitude, longitude, timestamp } = req.body;
  const userId = req.user.id; // Use the authenticated user's ID

  try {
    const newLocation = await prisma.Location.create({
      data: { latitude, longitude, timestamp, userId, name },
    });
    res.status(201).json(newLocation);
  } catch (error) {
    AppError('Error fetching location') 
  }
});

module.exports = createLocation;

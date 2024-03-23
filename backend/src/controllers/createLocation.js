const expressAsyncHandler = require('express-async-handler');
const { AppError } = require('../utils/AppErrors');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  errorFormat: 'minimal'
})

// Fetch current user location using geolocation API and store location
const createLocation = expressAsyncHandler(async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const userId = req.user.id; // Use the authenticated user's ID

  try {
    const newLocation = await prisma.location.create({
      data: { latitude, longitude, name, userId },
    });
    res.status(201).json(newLocation);
  } catch (error) {
    throw new AppError('Error Saving location') 
    
  }
});

module.exports = createLocation;

const expressAsyncHandler = require('express-async-handler');
const { AppError } = require('../utils/AppErrors');

const getLocationHistory = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id; // Use the authenticated user's ID

  try {
    // Fetch all location entries for the authenticated user from the database
    const locationHistory = await prisma.Location.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' }, // Optional: Order by timestamp in descending order
    });

    res.json(locationHistory); 
  } catch (error) {
    throw new AppError(error)
  }
});

module.exports = getLocationHistory;

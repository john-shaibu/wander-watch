const expressAsyncHandler = require('express-async-handler');

const getLocationHistory = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id; // Use the authenticated user's ID

  // Fetch all location entries for the authenticated user from the database
  const locationHistory = await prisma.Location.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' }, // Optional: Order by timestamp in descending order
  });

  res.json(locationHistory);
});

module.exports = getLocationHistory;

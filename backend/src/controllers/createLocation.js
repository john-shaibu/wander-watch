const expressAsyncHandler = require('express-async-handler');

// Fetch current user location using geolocation API and store location
const createLocation = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const timestamp = new Date();
  const userId = req.user.id; // Use the authenticated user's ID

  // Use the browser's Geolocation API to fetch user's current position
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Store the fetched location data in the database
        const newLocation = await prisma.Location.create({
          data: { latitude, longitude, timestamp, userId, name },
        });
        res.status(201).json(newLocation);
      },
      (error) => {
        console.error('Error fetching location:', error);
        res.status(500).json({ message: 'Error fetching location' });
      }
    );
  } else {
    res
      .status(400)
      .json({ message: 'Geolocation is not supported by this browser' });
  }
});

module.exports = createLocation;

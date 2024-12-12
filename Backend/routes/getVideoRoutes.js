const express = require('express');
const Video = require('../models/Video'); // Import the Video model
const { authenticate } = require('../middleware/auth'); // Authentication middleware (JWT)

const router = express.Router();

// GET route to fetch all videos for a specific user
router.post('/', async (req, res) => {
  try {
    const userId = req.body.id; // Get the user ID from the authenticated request
    console.log('User ID from request:', userId); // Log the user ID

    // Fetch videos for the specific user from MongoDB
    const videos = await Video.find({ userId });
    console.log(videos);
    // If no videos found
    if (!videos.length) {
      return res.status(404).json({ message: 'No videos found' });
    }

    // Return the list of videos
    return res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;

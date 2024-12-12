const express = require('express');
const Video = require('../models/Video'); // Import the Video model
const { authenticate } = require('../middleware/auth'); // Authentication middleware (JWT)

const router = express.Router();

// POST route to save a video
router.post('/post-videos', authenticate, async (req, res) => {
  try {
    const { title, description, url } = req.body;

    // Check if all required fields are present
    if (!title || !description || !url) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new video instance
    const video = new Video({
      title,
      description,
      url,
      userId: req.user.id // Assuming req.user.id is set after authentication
    });

    // Save the video to MongoDB
    await video.save();

    // Return success message with video object
    return res.status(200).json({
      message: 'Video uploaded successfully',
      video // Return the saved video object for confirmation
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upload video' });
  }
});

// GET route to fetch all videos for a specific user
// router.post('/get-videos', authenticate, async (req, res) => {
//   try {
//     const userId = req.body; // Get the user ID from the authenticated request
//     console.log('User ID from request:', userId); // Log the user ID

//     // Fetch videos for the specific user from MongoDB
//     const videos = await Video.find({ userId });
//     console.log(videos);
//     // If no videos found
//     if (!videos.length) {
//       return res.status(404).json({ message: 'No videos found' });
//     }

//     // Return the list of videos
//     return res.status(200).json(videos);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to fetch videos' });
//   }
// });

module.exports = router;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videoRoutes');  // Add the video route
const getVideoRoutes = require('./routes/getVideoRoutes');  // Add the video route

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);  // Register the video route
app.use('/api/get-videos', getVideoRoutes);  // Register the video route


// Database connection
connectDB();

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

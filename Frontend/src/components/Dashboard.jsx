import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [link, setLink] = useState(''); // State to store the user's video URL or other link
  const [title, setTitle] = useState(''); // New state for video title
  const [description, setDescription] = useState(''); // New state for video description
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear session or token
    navigate('/'); // Redirect to login page
  };

  // Handle link submission
  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      console.log(token);

      // Send title, description, and URL
      const videoData = {
        title,
        description,
        url: link,
      };

      // Make API request
      const response = await axios.post('http://localhost:5000/api/videos', videoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      // Show success toast
      toast.success('Video uploaded successfully!', {
        position: 'top-right',
      });

      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setLink('');
    } catch (error) {
      console.error('Error saving link:', error);
      // Show error toast
      toast.error('Failed to upload video. Please try again.', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="min-h-screen bg-purple-700">
      {/* Toast Container */}
      <ToastContainer />

      {/* Top Bar with Sierra and Logout */}
      <div className="navbar bg-purple-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold">Sierra</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Section with light purple background */}
      <div className="mainbody bg-purple-50 py-6 px-4">
        {/* Dashboard Content */}
        <h2 className="text-3xl text-purple-700 mb-4">Dashboard</h2>
        <p className="text-gray-700 mb-6">
          Welcome to your Dashboard! Here you can manage your videos, settings, and other features.
        </p>

        {/* Link to view uploaded videos */}
        <div className="meow mb-6">
          <button
            onClick={() => navigate('/videos')}
            className="py-3 px-6 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition"
          >
            View Uploaded Videos
          </button>
        </div>

        {/* Form to Submit Link */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4">Submit Video Link</h3>
          <form onSubmit={handleLinkSubmit}>
            {/* Title Input */}
            <input
              type="text"
              name="title"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Description Input */}
            <input
              type="text"
              name="description"
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Video URL Input */}
            <input
              type="url"
              name="link"
              placeholder="Enter video URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition"
            >
              Submit Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

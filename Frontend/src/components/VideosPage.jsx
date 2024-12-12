import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './styles.css';


export default function VideosPage () {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    // Fetch the user's uploaded videos
    const fetchVideos = async () => {

      const decoded = jwtDecode(token);
      console.log(decoded);

      try {
        const response = await axios.post('http://localhost:5000/api/get-videos', {         
          id: decoded.id
        });
        console.log(response.data);
        setVideos(response.data);  // Set the videos data from backend response
      } catch (error) {
        console.error('Error fetching videos:', error);  // Log error if API call fails
      }
    };

    if (token) {
      fetchVideos();  // Call the fetchVideos function if token exists
    }
  }, [token]);

  return (
    <div className="mainbody min-h-screen bg-gray-100 py-6 px-4">
      <h2 className="text-3xl text-purple-700 mb-4">Your Uploaded Videos</h2>

      {/* Grid layout to display the videos */}
      <div className="map grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          // If there are videos, map over the array and display each video
          videos.map((video) => (
            <div  key={video._id} className="mapchild bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.url.split('v=')[1]}/hqdefault.jpg`}  // Extract YouTube thumbnail
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-purple-700">{video.title}</h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No videos uploaded yet.</p>  // Message if no videos are available
        )}
      </div>
    </div>
  );
};

// export default VideosPage;

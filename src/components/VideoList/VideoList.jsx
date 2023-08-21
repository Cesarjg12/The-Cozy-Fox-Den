import React, { useState, useEffect } from 'react';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const videosData = await response.json();
          setVideos(videosData);
          setIsLoading(false);
        } else {
          setError('Error fetching videos');
        }
      } catch (error) {
        setError('An error occurred while fetching videos');
      }
    }
    fetchVideos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Video List</h2>
      {videos.map((video) => (
        <div key={video._id}>
          {/* Render video details here */}
        </div>
      ))}
    </div>
  );
};

export default VideoList;
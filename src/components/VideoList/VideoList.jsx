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
          const errorData = await response.json();
          setError(`Error fetching videos: ${errorData.error}`);
          setIsLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching videos');
        setIsLoading(false);
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
        </div>
      ))}
    </div>
  );
};

export default VideoList;
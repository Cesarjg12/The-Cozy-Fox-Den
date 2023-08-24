import React, { useState, useEffect } from 'react';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(videos)
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const videosData = await response.json();
          console.log(videosData)
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

  // Groups videos by category
  const videosByCategory = videos.reduce((map, video) => {
    const categoryName = video.category;

    if (!map[categoryName]) {
      map[categoryName] = [];
    }
    map[categoryName].push(video);
    return map;
  }, {});

  return (
    <div>
      <h2>Video List</h2>
      {Object.keys(videosByCategory).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          {videosByCategory[category].map((video) => (
            <div key={video._id}>
              <p>{video.title}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VideoList;


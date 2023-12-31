import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoList.css'

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

  // Groups videos by category
  const videosByCategory = videos.reduce((map, video) => {
    if (!map[video.category]) {
      map[video.category] = [];
    }
    map[video.category].push(video);
    return map;
  }, {});

  return (
    <div className="video-list-container">
      <h2>Pick a category and relax</h2>
      <div className="category-grid">
        {Object.keys(videosByCategory).map(category => (
          <div key={category} className="category-card">
            <h3 className="category-title">{category}</h3>
            <div className="video-card-list">
              {videosByCategory[category].map(video => (
                <div key={video._id} className="video-card">
                  <p>
                    <Link to={`/video/${video._id}`}>
                      {video.title ? video.title.slice(0, 40) : 'Untitled Video'}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default VideoList;
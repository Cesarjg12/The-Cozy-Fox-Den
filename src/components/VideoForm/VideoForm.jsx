import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { YOUTUBE_API_KEY } from '../../YoutubeAPI'; // Update the import path

const VideoForm = ({ categories, addVideo }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Move the getVideoIdFromUrl function here
  const getVideoIdFromUrl = (url) => {
    const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
    return match ? match[1] : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl, category: selectedCategory }),
      });

      if (response.ok) {
        const newVideo = await response.json();
        addVideo(newVideo);
        setVideoUrl('');
        setSelectedCategory('');
        setFeedbackMessage('Video added successfully');
      } else {
        // Handle error response
        const errorData = await response.json();
        setFeedbackMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      // Handle fetch error
      setFeedbackMessage('An error occurred while adding the video');
    }
  };

  return (
    <div>
      <h2>Add Video</h2>
      <form onSubmit={handleSubmit}>
        {/* ... Other input fields ... */}
        <input
          type="text"
          placeholder="YouTube Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {/* ... Options for categories ... */}
        </select>
        <button type="submit">Add Video</button>
      </form>
      {/* Display YouTube video preview */}
      {videoUrl && <YouTube videoId={getVideoIdFromUrl(videoUrl)} />}
    </div>
  );
};

export default VideoForm;
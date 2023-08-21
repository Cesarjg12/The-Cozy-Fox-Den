import React, { useState } from 'react';

const VideoForm = ({ categories, addVideo }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

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
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* ... (input fields and select options) */}
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default VideoForm;
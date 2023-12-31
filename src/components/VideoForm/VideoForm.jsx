import React, { useState } from 'react';
import YouTube from 'react-youtube';
import sendRequest from '../../utilities/send-request';
import categories from '../Categories/Categories';
import { toast } from 'react-toastify';
import './VideoForm.css'

const VideoForm = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const getVideoIdFromUrl = (url) => {
    const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
    return match ? match[1] : '';
  };

  const handleNotify = async (e) => {
    e.preventDefault();
    const extractedVideoId = getVideoIdFromUrl(videoUrl);

    try {
      const response = await sendRequest('/api/videos', 'POST', {
        videoUrl: extractedVideoId,
        category: selectedCategory,
      });
      if (response.title !== 'Untitled Video') {
        const newVideo = response;

        const selectedCategoryObject = categories.find(cat => cat.id === selectedCategory);

        const formattedVideo = {
          ...newVideo,
          customCategory: selectedCategoryObject ? selectedCategoryObject.name : '',
        };
        setVideoUrl('');
        setSelectedCategory('');
        toast.success('Success! Video has been added!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark'
        })
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while adding the video', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark'
      })
    }
  };

  return (
    <div className='form'>
      <h2>Like a video? Share a video!</h2>
      <form onSubmit={handleNotify}>
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
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Video</button>
      </form>
      {videoUrl && <YouTube videoId={getVideoIdFromUrl(videoUrl)} />}
    </div>
  );
};

export default VideoForm;


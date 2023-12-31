const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Video = require('../../models/video');
const categories = require('../../data/categoriesData');

// Function to extract video ID from URL
const getVideoIdFromUrl = (url) => {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
  return match ? match[1] : '';
};

// To add a new video
router.post('/', async (req, res) => {
  try {
    const { videoUrl, category } = req.body;

    // Fetch the video title from the YouTube API
    const videoId = getVideoIdFromUrl(videoUrl);
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoUrl}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`);
    const data = await response.json();
   
    
    const videoTitle = data.items[0]?.snippet?.title || 'Untitled Video';
  

    // Find the selected category
    const selectedCategory = categories.find(cat => cat.id === category);

    // Create and save the new video
    const newVideo = new Video({ 
      title: videoTitle,
      videoUrl,
      category: selectedCategory ? selectedCategory.name : '',
      userId: req.user.id, 
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ error: 'Unable to add video' });
  }
});

//To get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Unable to fetch videos' });
  }
});

module.exports = router;
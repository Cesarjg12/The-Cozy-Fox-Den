const express = require('express');
const router = express.Router();
const Video = require('../../models/video');
const categories = require('../../data/categoriesData');


// To add a new video
router.post('/', async (req, res) => {
    try {
      const { title, videoUrl, category } = req.body;
      const selectedCategory = categories.find(cat => cat.id === category)?.name || '';
      
      const newVideo = new Video({ 
        title, 
        videoUrl, 
        category:selectedCategory,
      userId: req.user.id, 
    });
      await newVideo.save();
      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ error: 'Unable to add video' });
    }
  });
  
  // In order to get all the videos
  router.get('/', async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve videos' });
    }
  });
  
  module.exports = router;
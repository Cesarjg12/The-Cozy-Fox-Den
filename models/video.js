const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  category: String,
});

module.exports = mongoose.model('Video', videoSchema);
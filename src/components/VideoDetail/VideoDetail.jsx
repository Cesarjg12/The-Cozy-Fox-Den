import React from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import '../Categories/Categories.css'

const VideoDetail = ({ videos }) => {
  const { videoId } = useParams();
  const video = videos.find(video => video._id === videoId);
console.log('Video', video)
  if (!video) {
    return <div>Video not found.</div>;
  }

  const videoUrl = `https://www.youtube.com/watch?v=${video.videoUrl}`;

  return (
    <div className={`category-${video.category}`}>
      <h2>{video.title}</h2>
      <YouTube videoId={video.videoUrl} />
    </div>
  );
};


export default VideoDetail;
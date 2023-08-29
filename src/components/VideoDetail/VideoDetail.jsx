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
      <div className="video-detail">
      <div className="title-box">
          <h2 className="video-title">{video.title}</h2>
          </div>
      <YouTube videoId={video.videoUrl} />
    </div>
  </div>
  );
};


export default VideoDetail;
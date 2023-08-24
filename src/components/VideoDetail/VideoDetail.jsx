import React from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';

const VideoDetail = ({ videos }) => {
  const { videoId } = useParams();
  const video = videos.find(video => video._id === videoId);

  if (!video) {
    return <div>Video not found.</div>;
  }

  const videoUrl = `https://www.youtube.com/embed/${video.videoUrl}`;
  
  return (
    <div>
      <h2>{video.title}</h2>
      <YouTube videoId={videoUrl} />
    </div>
  );
};

export default VideoDetail;
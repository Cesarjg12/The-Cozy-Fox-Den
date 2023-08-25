import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import VideoForm from '../../components/VideoForm/VideoForm';
import VideoList from '../../components/VideoList/VideoList';
import VideoDetail from '../../components/VideoDetail/VideoDetail';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const videosData = await response.json();
          setVideos(videosData);
        } else {
          console.error('Error fetching videos');
        }
      } catch (error) {
        console.error('An error occurred while fetching videos');
      }
    }
    fetchVideos();
  }, []);

  const handleNotify = () => {
    toast.success('This is a test notification');
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home handleNotify={handleNotify} />} />
            <Route path="/add-video" element={<VideoForm />} />
            <Route path="/video-list" element={<VideoList />} />
            <Route path="/video/:videoId" element={<VideoDetail videos={videos} />} />
          </Routes>
          <ToastContainer />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

// Create a Home component to display VideoList and VideoForm
function Home() {
  return (
    <div>
      <VideoForm />
      <VideoList />
    </div>
  );
}
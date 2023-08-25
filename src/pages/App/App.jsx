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
import HomePage from '../../components/HomePage/HomePage';

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
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-video" element={user ? <VideoForm /> : null} />
        <Route path="/video-list" element={<VideoList videos={videos} />} />
        <Route path="/video/:videoId" element={<VideoDetail videos={videos} />} />
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
      </Routes>
      <ToastContainer />
    </main>
  );
}

// Creates a Home page
function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

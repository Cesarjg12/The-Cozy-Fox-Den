import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import VideoForm from '../../VideoForm/VideoForm';
import VideoList from '../../VideoList/VideoList';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-video" element={<VideoForm />} />
          </Routes>
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

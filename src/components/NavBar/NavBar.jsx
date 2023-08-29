import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import logo from '../../Images/CozyfoxdenlogoNobg.png'
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
    <div className="logo-container">
      <Link to="/" title="Click me to go home!">
        <img src={logo} alt="Logo" className="logo" style={{ width: '15vmin', height: '15vmin' }} />
      </Link>
      <h1 className="title">The Cozy Fox Den</h1>
    </div>
    <div className="nav-links">
      <Link to="/video-list">Video List</Link>
      {user ? (
        <>
          <Link to="/add-video">Add Video</Link>
          <span>Welcome, {user.name}</span>
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      ) : (
        <>
          <span>Welcome!</span>
          <Link to="/login">Log In / Sign Up</Link>
        </>
      )}
    </div>
  </nav>
);
}
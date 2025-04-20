import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img 
          src="/hospital-logo.png" 
          alt="Hospital Logo" 
          className="hospital-logo" 
          style={{ height: '40px', marginRight: '10px' }}
        />
        <Link to="/" className="navbar-brand">City Hospital</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
      </div>
      {isLoggedIn ? (
        <div className="user-profile">
          <button 
            className="profile-button" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="username">{username}</span>
            <span className="dropdown-icon">▼</span>
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <button 
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  width: '20%',
                  textAlign: 'left',
                  padding: '5px 6px',
                  cursor: 'pointer',
                  color: '#333'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/signup" className="auth-button">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
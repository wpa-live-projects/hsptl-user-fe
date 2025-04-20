// src/components/Home.jsx
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import './Home.css';
import { logoutUser } from "../api/auth";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/"); // Optional: force refresh to home
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Saredufy Hospital Logo" className="hospital-logo" />
        <h1>Saredufy Hospital</h1>
        <p className="tagline">Caring for Life — Your Health, Our Priority</p>

        {/* Logout only if user is logged in */}
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      {!user && (
  <div className="auth-buttons">
    <Link to="/login" className="auth-button">Login</Link>
    <Link to="/signup" className="auth-button">Sign Up</Link>
  </div>
)}


      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Saredufy Hospital is a state-of-the-art healthcare facility committed to delivering compassionate and comprehensive medical services. 
          Our team of dedicated professionals works around the clock to ensure the health and well-being of every patient.
        </p>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <ul>
          <li>24/7 Emergency Care</li>
          <li>Outpatient & Inpatient Services</li>
          <li>Specialist Consultations</li>
          <li>Advanced Diagnostics</li>
          <li>Pharmacy & Lab</li>
        </ul>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: contact@saredufyhospital.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123, Health Avenue, Wellness City, India</p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Saredufy Hospital. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

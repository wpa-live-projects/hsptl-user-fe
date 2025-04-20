import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setFeature }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><button onClick={() => setFeature("dashboard")}>Dashboard</button></li>
        <li><button onClick={() => setFeature("register")}>Register Patient</button></li>
        <li><button onClick={() => setFeature("book")}>Book Appointment</button></li>
        <li><button onClick={() => setFeature("view")}>View Appointments</button></li>
        <li><button onClick={() => setFeature("search")}>Search Patient</button></li>
        <li><button onClick={() => setFeature("update")}>Update Patient</button></li>
        <li><button onClick={() => setFeature("check")}>Check Doctor Availability</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
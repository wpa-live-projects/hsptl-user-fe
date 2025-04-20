import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import RegisterPatientForm from './RegisterPatientForm';
import BookAppointment from './BookAppointment';
import ViewAppointments from './ViewAppointments';
import SearchPatient from './SearchPatient';
import UpdatePatient from './UpdatePatient';
import CheckDoctorAvailability from './CheckDoctor';
import axios from 'axios';
import { logoutUser } from '../api/auth'; // Assuming this exists
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const UserDashboard = () => {
  const [feature, setFeature] = useState("dashboard");
  const [counts, setCounts] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [doctorRes, patientRes, appointmentRes] = await Promise.all([
          axios.get('https://hsptl-user-be.onrender.com/api/doctors/count'),
          axios.get('https://hsptl-user-be.onrender.com/api/patients/count'),
          axios.get('https://hsptl-user-be.onrender.com/api/appointments/count'),
        ]);
        setCounts({
          doctors: doctorRes.data.count || 0,
          patients: patientRes.data.count || 0,
          appointments: appointmentRes.data.count || 0,
        });
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Optional: clear backend session if implemented
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setFeature={setFeature} />
      <div style={{ flex: 1, padding: "2rem", position: "relative" }}>
        <button className="logout-dashboard-button" onClick={handleLogout}>
          Logout
        </button>

        {feature === "dashboard" && (
          <div>
            <h2>Welcome to your Dashboard!</h2>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>Doctors</h3>
                <p>{counts.doctors}</p>
              </div>
              <div className="dashboard-card">
                <h3>Patients</h3>
                <p>{counts.patients}</p>
              </div>
              <div className="dashboard-card">
                <h3>Appointments</h3>
                <p>{counts.appointments}</p>
              </div>
            </div>
          </div>
        )}
        {feature === "register" && <RegisterPatientForm />}
        {feature === "book" && <BookAppointment />}
        {feature === "view" && <ViewAppointments />}
        {feature === "search" && <SearchPatient />}
        {feature === "update" && <UpdatePatient />}
        {feature === "check" && <CheckDoctorAvailability />}
      </div>
    </div>
  );
};

export default UserDashboard;


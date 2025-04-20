import { useState, useEffect } from 'react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://hsptl-user-be.onrender.com/api/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div>Loading doctors...</div>;

  return (
    <div className="doctors-page">
      <h1>Doctors</h1>
      <div className="doctors-list">
        {doctors.map(doctor => (
          <div key={doctor._id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>Specialization: {doctor.specialization}</p>
            <p>Contact: {doctor.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
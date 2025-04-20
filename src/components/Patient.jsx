import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added Link import

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://hsptl-user-be.onrender.com/api/patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div>Loading patients...</div>;

  return (
    <div className="patients-page">
      <div className="patients-header">
        <h1>Patients</h1>
        <Link to="/add-patient" className="btn btn-primary">Add Patient</Link>
      </div>
      
      <table className="patients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.patientId}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.contact}</td>
              <td>
                <Link to={`/edit-patient/${patient._id}`} className="btn btn-sm">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
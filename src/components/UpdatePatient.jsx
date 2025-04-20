import React, { useState, useEffect } from "react";
import "./Form.css";

function UpdatePatient() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://hsptl-user-be.onrender.com/api/patients")
      .then(res => res.json())
      .then(data => setPatients(data.patients))
      .catch(err => console.error("Error fetching patients:", err));
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://hsptl-user-be.onrender.com/api/patients/${selectedPatient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Patient updated successfully!");
        fetch("https://hsptl-user-be.onrender.com/api/patients")
          .then(res => res.json())
          .then(data => setPatients(data.patients));
      } else {
        setMessage("❌ " + (data.message || "Update failed"));
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Patient Information</h2>
      {message && <p className="message">{message}</p>}
      
      <div className="patient-selector">
        <h3>Select Patient to Update</h3>
        <div className="patient-list">
          {patients.map(patient => (
            <div 
              key={patient._id} 
              className={`patient-item ${selectedPatient?._id === patient._id ? 'selected' : ''}`}
              onClick={() => handlePatientSelect(patient)}
            >
              {patient.name}
            </div>
          ))}
        </div>
      </div>

      {selectedPatient && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Update Patient</button>
        </form>
      )}
    </div>
  );
}

export default UpdatePatient;

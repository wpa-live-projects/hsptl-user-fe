import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("https://hsptl-user-be.onrender.com/api/doctors");
        if (res.data.success) {
          setDoctors(res.data.doctors || []);
        } else {
          setError("Failed to fetch doctors");
        }
      } catch (err) {
        setError("Error fetching doctor data");
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Available Doctors</h2>
      {error && <p>{error}</p>}
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Available Days</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.specialization}</td>
                <td>{doc.availableDays?.join(", ") || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckDoctor;

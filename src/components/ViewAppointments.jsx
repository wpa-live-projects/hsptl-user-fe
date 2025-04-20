import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("https://hsptl-user-be.onrender.com/api/appointments");

        if (res.data.success) {
          // handle response from { success: true, appointments: [...] }
          setAppointments(res.data.appointments || []);
        } else {
          setError("Failed to fetch appointments.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching appointments.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Booked Appointments</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patientId}</td>
                <td>{appt.doctorName}</td>
                <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                <td>{appt.timeSlot}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAppointments;

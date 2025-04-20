import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://hsptl-user-be.onrender.com/api/doctors');
        setDoctors(response.data.doctors || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName || !doctorName || !appointmentDate || !timeSlot) {
      setMessage('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://hsptl-user-be.onrender.com/api/appointments', {
        patientName,
        doctorName,
        appointmentDate,
        timeSlot
      });

      setMessage(response.data.message || 'Appointment booked successfully');

      // Reset form
      setPatientName('');
      setDoctorName('');
      setAppointmentDate('');
      setTimeSlot('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage(error.response?.data?.message || 'Failed to book appointment');
    }
  };

  return (
    <div className="container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Doctor:</label>
          <select
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc, index) => (
              <option key={index} value={doc.name}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Time Slot:</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">-- Select Time Slot --</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <button type="submit">Book</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;

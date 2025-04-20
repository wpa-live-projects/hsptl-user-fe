import { useState, useEffect } from 'react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://hsptl-user-be.onrender.com/api/rooms');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading rooms...</div>;

  return (
    <div className="rooms-page">
      <h1>Rooms Management</h1>
      
      <div className="rooms-status">
        <div className="status-card available">
          <h3>Available</h3>
          <p>{rooms.filter(room => room.status === 'Available').length}</p>
        </div>
        <div className="status-card occupied">
          <h3>Occupied</h3>
          <p>{rooms.filter(room => room.status === 'Occupied').length}</p>
        </div>
        <div className="status-card maintenance">
          <h3>Maintenance</h3>
          <p>{rooms.filter(room => room.status === 'Maintenance').length}</p>
        </div>
      </div>
      
      <div className="rooms-list">
        {rooms.map(room => (
          <div key={room._id} className={`room-card ${room.status.toLowerCase()}`}>
            <h3>Room {room.roomNumber}</h3>
            <p>Type: {room.type}</p>
            <p>Status: {room.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
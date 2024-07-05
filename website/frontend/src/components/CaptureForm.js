import React, { useState } from 'react';

const CaptureForm = () => {
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi user ID di sisi client
    if (!/^[a-zA-Z0-9_-]*$/.test(userId)) {
      alert("Invalid user ID. Use only letters, numbers, underscores, or hyphens.");
      return;
    }

    // Mengambil geolokasi pengguna
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `user_id=${userId}&latitude=${latitude}&longitude=${longitude}`
        });

        const data = await response.json();
        alert(data.message);
      }, (error) => {
        alert('Error getting geolocation: ' + error.message);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="user_id" className="form-label">User ID:</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Capture Images</button>
    </form>
  );
};

export default CaptureForm;

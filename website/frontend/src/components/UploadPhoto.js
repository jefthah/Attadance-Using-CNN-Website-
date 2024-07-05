import React, { useState } from 'react';

const UploadPhoto = () => {
  const [userId, setUserId] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[a-zA-Z0-9_-]*$/.test(userId)) {
      alert("Invalid user ID. Use only letters, numbers, underscores, or hyphens.");
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
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
      <div className="mb-3">
        <label htmlFor="file" className="form-label">Upload Photo:</label>
        <input
          type="file"
          id="file"
          name="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Upload Photo</button>
    </form>
  );
};

export default UploadPhoto;

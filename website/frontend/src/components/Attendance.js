import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';

const Attendance = () => {
  const { courseId, meetingId } = useParams();
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userId, setUserId] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    console.log("Captured image:", imageSrc);
  };

  const handleSubmit = async () => {
    if (!/^[a-zA-Z0-9_-]*$/.test(userId)) {
      alert("Invalid user ID. Use only letters, numbers, underscores, or hyphens.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Sending data to server:", {
          user_id: userId,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          image: capturedImage.split(',')[1]
        });

        const response = await fetch('http://localhost:5000/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            user_id: userId,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            image: capturedImage.split(',')[1] // Remove 'data:image/jpeg;base64,'
          }),
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
    <div className="container mt-5">
      <h2>Attendance for {meetingId} in {courseId}</h2>
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
      <div className="d-flex justify-content-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="border border-dark"
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={capture} className="btn btn-secondary">Capture Photo</button>
      </div>
      {capturedImage && (
        <div className="mt-3 text-center">
          <h4>Captured Image</h4>
          <img src={capturedImage} alt="Captured" className="img-thumbnail" />
        </div>
      )}
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleSubmit} className="btn btn-primary">Submit Attendance</button>
      </div>
    </div>
  );
};

export default Attendance;

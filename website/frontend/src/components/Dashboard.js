import React from 'react';
import CaptureForm from './CaptureForm';
import WebcamCapture from './WebcamCapture';
import UploadPhoto from './UploadPhoto';

const Dashboard = () => {
  return (
    <div className="mt-5">
      <h1 className="text-center">Capture Images and Verify Location</h1>
      <CaptureForm />
      <WebcamCapture />
      <UploadPhoto />
    </div>
  );
};

export default Dashboard;

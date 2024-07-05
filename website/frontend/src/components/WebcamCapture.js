import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="mt-5">
      <h2 className="text-center">Webcam Capture</h2>
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
    </div>
  );
};

export default WebcamCapture;

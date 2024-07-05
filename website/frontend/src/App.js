import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Attendance from './components/Attendance';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/attendance/:courseId/:meetingId" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

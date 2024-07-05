import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const courses = [
  { id: '1', name: 'Bahasa Inggris' },
  { id: '2', name: 'Internet of Things' },
  { id: '3', name: 'Pembangunan Perangkat Lunak' },
];

const CourseList = () => {
  return (
    <div className="container mt-5">
      <h2>Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4" key={course.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Link to={`/course/${course.id}`}>
                  <Button variant="primary">View</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const meetings = [
  { id: '1', name: 'Pertemuan 1' },
  { id: '2', name: 'Pertemuan 2' },
  { id: '3', name: 'Pertemuan 3' },
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const courseName = courseId === '1' ? 'Bahasa Inggris' :
                     courseId === '2' ? 'Internet of Things' : 
                     'Pembangunan Perangkat Lunak';

  return (
    <div className="container mt-5">
      <h2>{courseName}</h2>
      <div className="row">
        {meetings.map(meeting => (
          <div className="col-md-4" key={meeting.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{meeting.name}</Card.Title>
                <Link to={`/attendance/${courseId}/${meeting.id}`}>
                  <Button variant="primary">Absensi</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;

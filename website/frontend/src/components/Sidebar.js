import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="/grades">Grades</Nav.Link>
      <Nav.Link href="/messages">Messages</Nav.Link>
      <Nav.Link href="/preferences">Preferences</Nav.Link>
      <Nav.Link href="/logout">Log out</Nav.Link>
    </Nav>
  );
};

export default Sidebar;

// src/UserCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';

const UserCard = ({ user }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={user.avatar} alt={user.name} />
      <Card.Body>
        <Card.Title>{user.first_name}</Card.Title>
        <Card.Text>{user.last_name}</Card.Text>
        <Card.Text>{user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;

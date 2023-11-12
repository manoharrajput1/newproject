// src/UserList.js
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';

const UserList = ({ users }) => {
    
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    );
};

export default UserList;

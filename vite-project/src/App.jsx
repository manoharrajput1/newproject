// src/App.js
import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const usersPerPage = 20;

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
        const ndata = response.data
        return ndata
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
  }, []);

  const handleSearch = async (e) => {
    try {
      setSearchQuery(e.target.value)
      const response = await axios.get(`http://localhost:5000/users/search/${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  const handleFilter = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/filter/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: filters
      });
      console.log(response.data);
      setUsers(response.data)

    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>User Cards</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => { handleSearch(e) }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin:'5px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', margin:'5px' }}>
          <label style={{ margin:'2px' }}>Domain:</label>
          <select onChange={(e) => handleFilterChange('domain', e.target.value)}>
            <option value="">Any</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Management">Management</option>
            <option value="UI Designing">UI Designing</option>
            <option value="Business Development">Business Development</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', margin:'5px' }}>
          <label style={{ margin:'2px' }}>Gender:</label>
          <select onChange={(e) => handleFilterChange('gender', e.target.value)}>
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', margin:'5px' }}>
          <label style={{ margin:'2px' }}>Availability:</label>
          <select onChange={(e) => handleFilterChange('available', e.target.value)}>
            <option value="">Any</option>
            <option value={true} >Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button onClick={handleFilter} >Apply</button>
      </div>
      <UserList users={currentUsers} />
      <Pagination >
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <Pagination.Item className='disp' key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default App;

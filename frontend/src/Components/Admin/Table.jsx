

import React, { useState, useEffect } from 'react';
import { adminBaseUrl } from '../../utils/adminBaseUrl';
import axios from 'axios';

const Table = () => {
  const [userData, setUserData] = useState([]);

  const toggleBlock = (userId) => {
    // Your logic for toggling block status based on user ID
    console.log(`Toggling block for user ID: ${userId}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${adminBaseUrl}/userData`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <h4>User Management</h4>
      <table className='admin-table' style={{ fontFamily: 'poppins' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item,index) => (
            <tr key={item._id}>
            <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  onClick={() => toggleBlock(item._id)}
                  style={{
                    backgroundColor: 'lightgreen',
                    border: 'none',
                    width: '5rem',
                    borderRadius: '0.4rem',
                  }}
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

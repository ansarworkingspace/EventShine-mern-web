

import React, { useState, useEffect } from 'react';
import { adminBaseUrl } from '../../utils/adminBaseUrl';
import axios from 'axios';

const Table = () => {
    
  const [userData, setUserData] = useState([]);

  const toggleBlock = async (userId) => {
    try {
      // Make a request to the backend to toggle user status
      await axios.post(`${adminBaseUrl}/toggleUserStatus`, { userId });

      // Update the local state based on the response
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user._id === userId ? { ...user, status: !user.status } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
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
                {item.status ? (
                  <button
                    onClick={() => toggleBlock(item._id)}
                    style={{
                      backgroundColor: '#7aff94',
                      border: 'none',
                      width: '5rem',
                      borderRadius: '0.4rem',
                      color:"black"
                    }}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => toggleBlock(item._id)}
                    style={{
                      backgroundColor: '#ff7a7a',
                      border: 'none',
                      width: '5rem',
                      borderRadius: '0.4rem',
                      color:"black"
                    }}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

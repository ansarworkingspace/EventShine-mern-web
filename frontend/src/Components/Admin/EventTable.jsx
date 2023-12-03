

import React, { useState, useEffect } from 'react';
import { adminBaseUrl } from '../../utils/adminBaseUrl';
import axios from 'axios';

const EventTable = () => {
  

  return (
    <>
      
      <table className='admin-table' style={{ fontFamily: 'poppins' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Time & Date</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          
            <tr>
              <td>1</td>
              <td>Google Meetup</td>
              <td>
                
                  <button
                    style={{
                      backgroundColor: 'rgb(249 234 98)',
                      border: 'none',
                      width: '7rem',
                      borderRadius: '0.4rem',
                      cursor:"auto"
                    }}
                  >
                    Sheduled
                  </button>
                
              </td>
              <td>2/Nov/2023</td>
              <td>
                
                  <button
                    style={{
                      backgroundColor: 'rgb(255, 122, 122)',
                      border: 'none',
                      width: '5rem',
                      borderRadius: '0.4rem',
                    }}
                  >
                    Delete
                  </button>
                
              </td>
            </tr>
        
        </tbody>
      </table>
    </>
  );
};

export default EventTable;

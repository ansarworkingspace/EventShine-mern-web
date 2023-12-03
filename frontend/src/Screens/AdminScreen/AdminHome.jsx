
import React from 'react';
import './css/adminHome.css'
import Table from '../../Components/Admin/Table'
import { useLocation } from 'react-router-dom';


const AdminHome = () => {

  // Dummy data
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // Add more dummy data as needed
  ];

  const location = useLocation()
  const isUserManagement = location.pathname.startsWith("/admin/adminHome"); 

  const location2 = useLocation()
  const isEventManagement = location2.pathname.startsWith("/admin/events"); 


  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      {/* Sidebar Component */}
      <div className='sidebar'
        style={{
          flex: '0 0 250px', // Sidebar width
          backgroundColor: '#333',
          color: 'white',
          padding: '20px',
          borderTopLeftRadius: '10px', // Top-left border-radius
          borderBottomLeftRadius: '10px', // Bottom-left border-radius
        }}
      >
        <h4>Menu</h4>
        <div className='navigations'>
        <div className='title' style={{ backgroundColor: isUserManagement ? 'rgb(15, 196, 104, 0.9)' : '' }}>
            
            <h6>User Management</h6></div>

            <div className='title' style={{ backgroundColor: isEventManagement ? 'rgb(15, 196, 104, 0.9)' : '' }}>
            
            <h6>Event Management</h6></div>
        </div>
       
        {/* Add your sidebar content here */}
      </div>

      {/* Workspace Component */}
      <div className='workspace'
        style={{
          flex: '1', // Takes the remaining space
          padding: '20px',
          backgroundColor: 'white',
          borderTopRightRadius: '10px', // Top-right border-radius
          borderBottomRightRadius: '10px', // Bottom-right border-radius
        }}
      >
        <Table data={data} />
        {/* Add your workspace content here */}
      </div>
    </div>
  );
};

export default AdminHome;



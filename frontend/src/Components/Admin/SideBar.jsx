
import React from 'react';
import '../../Screens/AdminScreen/css/adminHome.css'
import { useLocation,useNavigate } from 'react-router-dom';


const SideBar = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const isUserManagement = location.pathname.startsWith("/admin/adminHome"); 

  const location2 = useLocation()
  const isEventManagement = location2.pathname.startsWith("/admin/adminEvents"); 


  const handleUserManagementClick = () => {
    navigate('/admin/adminHome');
  };

  const handleEventManagementClick = () => {
    navigate('/admin/adminEvents');
  };



  return (
    

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
        <div className='title'  onClick={handleUserManagementClick} style={{ backgroundColor: isUserManagement ? 'rgb(15, 196, 104, 0.9)' : '' }}>
            
            <h6>User Management</h6></div>

            <div className='title' onClick={handleEventManagementClick} style={{ backgroundColor: isEventManagement ? 'rgb(15, 196, 104, 0.9)' : '' }}>
            
            <h6>Event Management</h6></div>
        </div>
       
        {/* Add your sidebar content here */}
      </div>

     
   
  );
};

export default SideBar;
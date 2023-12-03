
import React from 'react';
import './css/adminHome.css'
import SideBar from '../../Components/Admin/SideBar'
import EventTable from '../../Components/Admin/EventTable'
import { useNavigate } from 'react-router-dom';

const AdminEventManageScreen = () => {

    const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
     <SideBar/>
      <div className='workspace'
        style={{
          flex: '1', // Takes the remaining space
          padding: '20px',
          backgroundColor: 'white',
          borderTopRightRadius: '10px', // Top-right border-radius
          borderBottomRightRadius: '10px', // Bottom-right border-radius
        }}
      >
       
       <h4>Event Management</h4>
       <button onClick={()=>navigate('/admin/AddEvent')}  style={{
                      
                      backgroundColor: '#ff7a7a',
                      border: 'none',
                      width: '7rem',
                      borderRadius: '0.4rem',
                      fontFamily:"poppins"
                    }}>Add Event</button>

      <EventTable/>
      </div>
    </div>
  );
};

export default AdminEventManageScreen;



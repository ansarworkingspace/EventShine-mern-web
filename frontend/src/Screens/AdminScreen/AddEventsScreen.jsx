
import React from 'react';
import './css/adminHome.css'
import SideBar from '../../Components/Admin/SideBar'
import AddEventForm from '../../Components/Admin/AddEventForm'
import { useNavigate } from 'react-router-dom';


const AddEventsScreen = () => {
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
       
       <h4>Add Event</h4>
       <button onClick={()=>navigate('/admin/adminEvents')}  style={{
                      backgroundColor: '#ff7a7a',
                      border: 'none',
                      width: '13rem',
                      borderRadius: '0.4rem',
                      fontFamily:"poppins",
                      color:'black'
                    }}> {'< '} Event Management</button>
           <AddEventForm/>
    
      </div>
    </div>
  );
};

export default AddEventsScreen;



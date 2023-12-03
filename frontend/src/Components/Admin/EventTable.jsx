

// import React, { useState, useEffect } from 'react';
// import { adminBaseUrl } from '../../utils/adminBaseUrl';
// import axios from 'axios';

// const EventTable = () => {
  

//   return (
//     <>
      
//       <table className='admin-table' style={{ fontFamily: 'poppins' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Time & Date</th>
//             <th>Option</th>
//           </tr>
//         </thead>
//         <tbody>
          
//             <tr>
//               <td>1</td>
//               <td>Google Meetup</td>
//               <td>
                
//                   <button
//                     style={{
//                       backgroundColor: 'rgb(249 234 98)',
//                       border: 'none',
//                       width: '7rem',
//                       borderRadius: '0.4rem',
//                       cursor:"auto",
//                       color:'black'
//                     }}
//                   >
//                     Sheduled
//                   </button>
                
//               </td>
//               <td>2/Nov/2023</td>
//               <td>
                
//                   <button
//                     style={{
//                       backgroundColor: 'rgb(255, 122, 122)',
//                       border: 'none',
//                       width: '5rem',
//                       borderRadius: '0.4rem',
//                       color:'black'
//                     }}
//                   >
//                     Delete
//                   </button>
                
//               </td>
//             </tr>
        
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default EventTable;





import React, { useState, useEffect } from 'react';
import { adminBaseUrl } from '../../utils/adminBaseUrl';
import axios from 'axios';
import {toast} from 'react-toastify'

const EventTable = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Fetch events data from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${adminBaseUrl}/showEvents`);
        setEventsData(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error as needed
      }
    };

    fetchEvents();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount



  const handleDelete = async (eventId) => {
    try {
      // Send a request to delete the event
      const res = await axios.post(`${adminBaseUrl}/deleteEvent`, { eventId });
      toast.success(res.data.message);
      
      // Refresh the events data after deletion
      const response = await axios.get(`${adminBaseUrl}/showEvents`);
      setEventsData(response.data);
    } catch (error) {
      console.error('Error deleting event:', error);
      // Handle error as needed
    }
  };





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
          {eventsData.map((event, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>
                <button
                  style={{
                    backgroundColor: !event.status ? 'rgb(249 234 98)' : 'rgba(15, 196, 104, 0.9)',
                    border: 'none',
                    width: '7rem',
                    borderRadius: '0.4rem',
                    cursor: 'auto',
                    color: !event.status ?'black': 'white',
                  }}
                >
                  {!event.status ? 'Scheduled' : 'Streaming'}
                </button>
              </td>
              <td>{event.data}</td>
              <td>
                <button
                  onClick={() => handleDelete(event.id)}
                  style={{
                    backgroundColor: 'rgb(255, 122, 122)',
                    border: 'none',
                    width: '5rem',
                    borderRadius: '0.4rem',
                    color: 'black',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EventTable;

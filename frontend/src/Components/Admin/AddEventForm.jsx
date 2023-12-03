// import React, { useState } from 'react';

// const AddEventForm = () => {
//   const [eventName, setEventName] = useState('');
//   const [description, setDescription] = useState('');
//   const [youtubeLink, setYoutubeLink] = useState('');
//   const [scheduleDate, setScheduleDate] = useState('');
//   const [scheduleTime, setScheduleTime] = useState('');
//   const [image, setImage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Handle form submission logic here
//     const eventData = {
//       eventName,
//       description,
//       youtubeLink,
//       scheduleDate,
//       scheduleTime,
//       image,
//     };

//     console.log('Submitted data:', eventData);

//     // You can send the data to your API or perform any necessary actions here
//   };

//   return (
//     <div>
     
//       <form onSubmit={handleSubmit}>
//         <label>
//           Event Name:
//           <input
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//           />
//         </label>

//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>

//         <label>
//           Youtube Video Link:
//           <input
//             type="text"
//             value={youtubeLink}
//             onChange={(e) => setYoutubeLink(e.target.value)}
//           />
//         </label>

//         <label>
//           Schedule Date:
//           <input
//             type="date"
//             value={scheduleDate}
//             onChange={(e) => setScheduleDate(e.target.value)}
//           />
//         </label>

//         <label>
//           Schedule Time:
//           <input
//             type="time"
//             value={scheduleTime}
//             onChange={(e) => setScheduleTime(e.target.value)}
//           />
//         </label>

//         <label>
//           Image:
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.value)}
//           />
//         </label>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddEventForm;


import React, { useState } from 'react';
import './css/addEvent.css'; // Import a separate CSS file for styling

const AddEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const eventData = {
      eventName,
      description,
      youtubeLink,
      scheduleDate,
      scheduleTime,
      image,
    };

    console.log('Submitted data:', eventData);

    // You can send the data to your API or perform any necessary actions here
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>
            Event Name:
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Youtube Video Link:
            <input
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          </label>

          <label>
            Schedule Date:
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Schedule Time:
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </label>

          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEventForm;

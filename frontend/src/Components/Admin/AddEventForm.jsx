
import React, { useState } from 'react';
import './css/addEvent.css'; // Import a separate CSS file for styling
import axios from 'axios';
import {adminBaseUrl} from '../../utils/adminBaseUrl'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddEventForm = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [image, setImage] = useState(null);
  
     const navigate = useNavigate()



    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('eventName', eventName);
      formData.append('description', description);
      formData.append('youtubeLink', youtubeLink);
      formData.append('scheduleDate', scheduleDate);
      formData.append('scheduleTime', scheduleTime);
      formData.append('media', image);
  
      try {
        
        const response = await axios.post(`${adminBaseUrl}/eventAdded`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
       toast.success('Event Uploaded Successfuly');
         
       navigate('/admin/adminEvents');

      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}  encType="multipart/form-data" className="event-form">
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
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEventForm;

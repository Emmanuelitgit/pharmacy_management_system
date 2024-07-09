// src/Calendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const Calender = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/appointments')
      .then(response => response.json())
      .then(data => {
        const formattedEvents = data?.map(appointment => ({
          title: appointment.description,
          start: new Date(appointment.date),
          end: new Date(appointment.date),
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 540, width:'70%' }}
        timeslots={10}
      />
    </div>
  );
};

export default Calender;

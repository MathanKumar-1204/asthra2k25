import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import "./event.css";
const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.email) {
          console.error("User not logged in");
          return;
        }

        const response = await fetch(`https://api.sheetbest.com/sheets/b0b06cc5-a1ef-41ee-b7c0-a123d92d771e?email=${userInfo.email}`);
        if (response.ok) {
          const data = await response.json();
          setRegisteredEvents(data);
        } else {
          console.error('Failed to fetch registered events');
        }
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="fixed inset-0 h-screen bg-[#121212] text-[#00FFFF] flex flex-col">
      <div className="py-3 md:py-6">
        <h2 className="text-xl md:text-3xl font-bold text-center neon-text">
          REGISTERED EVENTS
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-evenly px-2 md:px-4">
        {registeredEvents.map((event, index) => (
          <EventCard
            key={index}
            event={{
              id: index,
              name: event.eventName,
              logo: "https://via.placeholder.com/150", // Replace with actual logo URL if available
              teamName: event.teamName,
              members: event.teamMembers.split(','), // Assuming teamMembers is a comma-separated string
            }}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;

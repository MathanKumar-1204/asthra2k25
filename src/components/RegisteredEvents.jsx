import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import eventsData from './events.json';

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create a flattened map of all events for easy lookup
  const allEventsMap = {};
  Object.keys(eventsData).forEach(category => {
    Object.keys(eventsData[category]).forEach(eventKey => {
      const event = eventsData[category][eventKey];
      allEventsMap[event.name] = event;
    });
  });

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.email) {
          console.error("User not logged in");
          setLoading(false);
          return;
        }

        // Fetch all events
        const response = await fetch(`https://api.sheetbest.com/sheets/b0b06cc5-a1ef-41ee-b7c0-a123d92d771e`);
        if (response.ok) {
          const data = await response.json();

          // Filter events for the current user
          const userEvents = data.filter(event =>
            event.email === userInfo.email ||
            (event.teamMembers && event.teamMembers.includes(userInfo.email))
          );

          setRegisteredEvents(userEvents);
        } else {
          console.error('Failed to fetch registered events');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching registered events:', error);
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="fixed inset-0 h-screen bg-[#121212] text-[#00FFFF] flex flex-col overflow-hidden">
      <div className="py-3 md:py-6">
        <h2 className="text-xl md:text-3xl font-bold text-center neon-text">
          REGISTERED EVENTS
        </h2>
      </div>

      <div className="flex-1 px-4 md:px-8 pb-6 overflow-y-auto events-grid">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-xl">Loading your events...</p>
          </div>
        ) : registeredEvents.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-xl">You haven't registered for any events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {registeredEvents.map((event, index) => {
              // Find the matching event in the events.json data
              const eventInfo = allEventsMap[event.eventName] || {};

              // Use a placeholder URL if the logo is not found
              const placeholderLogo = "https://via.placeholder.com/150x150/121212/00FFFF?text=Event";

              return (
                <div
                  key={index}
                  className="bg-[#0D0122] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="p-6">
                    <img
                      src={eventInfo.logo || placeholderLogo}
                      alt={event.eventName}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <h3 className="text-xl font-semibold mt-4">{event.eventName}</h3>
                    <p className="text-gray-300 mt-2">Team: {event.teamName || "Not specified"}</p>
                    <p className="text-gray-300">Phone: {event.contact|| "Not provided"}</p>
                    <p className="text-gray-300">Email: {event.email}</p>
                    <p className="text-gray-300">College: {event.college}</p>
                    <p className="text-gray-300">Members: {event.teamMembers ? event.teamMembers.split(',').map(member => member.trim()).join(', ') : "None"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;

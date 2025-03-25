import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import eventsData from './events.json';
import "./event.css";

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
          <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            {registeredEvents.map((event, index) => {
              // Find the matching event in the events.json data
              const eventInfo = allEventsMap[event.eventName] || {};
              
              // Use a placeholder URL if the logo is not found
              const placeholderLogo = "https://via.placeholder.com/150x150/121212/00FFFF?text=Event";
              
              return (
                <EventCard
                  key={index}
                  event={{
                    id: index,
                    name: event.eventName,
                    logo: eventInfo.logo || placeholderLogo,
                    teamName: event.teamName || "Not specified",
                    phoneNumber: event.phoneNumber || event.phone,
                    email: event.email,
                    college: event.college,
                    additionalInfo: event.additionalInfo,
                    slot: eventInfo.slot,
                    members: event.teamMembers ? event.teamMembers.split(',').map(member => member.trim()) : [],
                    memberNames: event.memberNames ? event.memberNames.split(',').map(name => name.trim()) : [],
                  }}
                  isReversed={index % 2 !== 0}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
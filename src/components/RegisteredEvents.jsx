import React from 'react';
import EventCard from './EventCard';

const RegisteredEvents = () => {
  const allEvents = [
    {
      id: 1,
      name: "Hackathon 2024",
      logo: "https://cdn-icons-png.flaticon.com/128/3098/3098090.png",
      teamName: "Tech Wizards",
      members: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
    {
      id: 2,
      name: "Code Sprint",
      logo: "https://cdn-icons-png.flaticon.com/128/1005/1005141.png",
      teamName: "Binary Ninjas",
      members: ["Alice Brown", "Bob Wilson"],
    },
    {
      id: 3,
      name: "AI Summit",
      logo: "https://cdn-icons-png.flaticon.com/128/1693/1693746.png",
      teamName: "Neural Network",
      members: ["Sarah Lee", "Tom Clark"],
    },
    {
      id: 4,
      name: "Web Dev Con",
      logo: "https://cdn-icons-png.flaticon.com/128/5968/5968267.png",
      teamName: "Frontend Force",
      members: ["Jack Hill", "Emma Davis"],
    },
    {
      id: 5,
      name: "Data Science Day",
      logo: "https://cdn-icons-png.flaticon.com/128/4248/4248443.png",
      teamName: "Data Dragons",
      members: ["Chris Wong", "Diana Miller"],
    }
  ];

  return (
    <div className="fixed inset-0 h-screen bg-[#1e3a8a] flex flex-col">
      <div className="py-3 md:py-6">
        <h2 className="text-xl md:text-3xl font-bold text-white text-center">
          REGISTERED EVENTS
        </h2>
      </div>
      
      <div className="flex-1 flex flex-col justify-evenly px-2 md:px-4">
        {allEvents.map((event, index) => (
          <EventCard 
            key={event.id}
            event={event}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents; 
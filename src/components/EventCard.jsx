import React from 'react';

const EventCard = ({ event, isReversed }) => {
  const EventBox = () => (
    <div className="w-[160px] md:w-[280px] bg-white rounded-xl p-2 md:p-4 flex flex-col items-center justify-center h-[70px] md:h-[100px]">
      <img 
        src={event.logo}
        alt={event.name}
        className="w-6 h-6 md:w-10 md:h-10 object-contain mb-1 md:mb-2"
      />
      <h3 className="font-medium text-gray-800 text-xs md:text-base">
        {event.name}
      </h3>
    </div>
  );

  const TeamBox = () => (
    <div className="w-[160px] md:w-[280px] bg-white rounded-xl p-2 md:p-4 min-h-[70px] md:min-h-[100px]">
      <h4 className="font-medium text-gray-800 text-xs md:text-base mb-1 md:mb-3">
        Team: {event.teamName}
      </h4>
      <div className="flex flex-wrap gap-1 md:gap-2">
        {event.members.map((member, index) => (
          <span 
            key={index} 
            className="bg-[#1e3a8a] text-white px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm"
          >
            {member}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-[350px] md:w-[600px] bg-white/5 backdrop-blur-sm rounded-xl p-2 md:p-4 flex flex-row justify-center items-center gap-2 md:gap-6">
        {isReversed ? (
          <>
            <TeamBox />
            <EventBox />
          </>
        ) : (
          <>
            <EventBox />
            <TeamBox />
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard; 
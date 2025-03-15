import "./event.css";
import React from 'react';

const EventCard = ({ event, isReversed }) => {
  const EventBox = () => (
    <div className="event-box">
      <img
        src={event.logo}
        alt={event.name}
        className="event-logo"
      />
      <h3 className="event-name">
        {event.name}
      </h3>
    </div>
  );

  const TeamBox = () => (
    <div className="team-box">
      <h4 className="team-name">
        Team: {event.teamName}
      </h4>
      <div className="members-list">
        {event.members.map((member, index) => (
          <span key={index} className="member-tag">
            {member}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="event-card-container">
      <div className={`event-card ${isReversed ? 'reversed' : ''}`}>
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

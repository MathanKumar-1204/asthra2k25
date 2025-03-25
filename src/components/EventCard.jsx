import "./event.css";
import React, { useState } from 'react';

const EventCard = ({ event, isReversed }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="event-card-container">
      <div className={`event-card-horizontal ${isReversed ? 'reversed' : ''}`}>
        <div className="event-box-horizontal">
          <img
            src={event.logo}
            alt={event.name}
            className="event-logo"
          />
          <h3 className="event-name">
            {event.name}
          </h3>
          {event.slot && (
            <p className="event-slot">{event.slot}</p>
          )}
        </div>
        
        <div className="team-box-horizontal">
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
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="show-details-btn"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>
      
      {showDetails && (
        <div className="details-box">
          <h5 className="details-title">Registration Details:</h5>
          <ul className="details-list">
            {event.phoneNumber && <li><span className="detail-label">Phone:</span> {event.phoneNumber}</li>}
            {event.email && <li><span className="detail-label">Email:</span> {event.email}</li>}
            {event.college && <li><span className="detail-label">College:</span> {event.college}</li>}
            {event.additionalInfo && <li><span className="detail-label">Additional Info:</span> {event.additionalInfo}</li>}
            
            {event.memberNames && event.memberNames.length > 0 && (
              <li>
                <span className="detail-label">Team Members:</span>
                <ul className="member-details">
                  {event.memberNames.map((name, index) => (
                    <li key={index}>
                      {name} {event.members[index] ? `(${event.members[index]})` : ''}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventCard;
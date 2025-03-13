import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import eventsData from "./events.json";
import Photos from "./Photos"; // Import the Photos component
import Reg from "./Reg"; // Import the Reg component

const EventsPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [showRegPopup, setShowRegPopup] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventId = params.get("eventId");
  const navigate = useNavigate();
  useEffect(() => {
    if (eventId) {
      const allEvents = { ...eventsData.TechEvents, ...eventsData.NonTechEvents };
      if (allEvents[eventId]) {
        setEventDetails(allEvents[eventId]);
      } else {
        console.error("Event not found");
      }
    }
  }, [eventId]);

  if (!eventDetails) {
    return <div className="text-center text-white">Loading event details...</div>;
  }

  const handleRegisterClick = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setShowRegPopup(true); // Show the registration popup
    } else {
      navigate("/login"); // Navigate to the login page
    }
  };

  const handleCloseRegPopup = () => {
    setShowRegPopup(false); // Close the registration popup
  };

  // Prepare members data for Photos component
  const members = Object.entries(eventDetails.members).map(([name, image]) => ({
    position: name, // Using the name as the position for simplicity
    name,
    image,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1A1A1D] to-[#3B1C32] p-6 text-[#E1BEE7] w-full">
      {/* Event Name */}
      <div className="bg-[#A64D79] px-8 py-4 rounded-full text-lg sm:text-3xl font-extrabold mb-8 shadow-lg text-[#1A1A1D] uppercase tracking-wider text-center w-full max-w-xs sm:max-w-md">
        {eventDetails.name}
      </div>

      <div className="flex flex-col sm:flex-row w-full max-w-6xl items-center gap-6 sm:gap-12">
        {/* Left Side - Event Poster */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            src={eventDetails.poster}
            alt="Event Poster"
            className="w-full sm:w-[95%] sm:max-w-2xl h-auto rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:opacity-90 border-4 border-[#A64D79]"
            onClick={() => setIsEnlarged(true)}
          />
        </div>

        {/* Right Side - Event Details */}
        <div className="w-full sm:w-1/2 flex flex-col space-y-6 text-lg">
          {/* Rules */}
          <div className="bg-[#6A1E55] p-6 rounded-lg text-center text-[#E1BEE7] font-bold shadow-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-center underline">Rules</h3>
            <ul className="list-disc list-inside space-y-2 text-left">
              {eventDetails.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Team Members */}
          <div className="bg-[#6A1E55] p-6 rounded-lg text-center text-[#E1BEE7] font-bold shadow-md w-full">
            <h3 className="text-2xl font-bold mb-2">Team Members</h3>
            <p>{eventDetails.teamMembers}</p>
          </div>

          {/* Slot */}
          <div className="bg-[#6A1E55] p-6 rounded-lg text-center text-[#E1BEE7] font-bold shadow-md w-full">
            <h3 className="text-2xl font-bold mb-2">Slot</h3>
            <p>{eventDetails.slot}</p>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegisterClick}
            className="mt-4 px-3 py-1 bg-[#FF5733] text-white text-md font-bold  shadow-lg hover:bg-[#C70039] transition-all duration-300 transform hover:scale-110 hover:animate-pulse w-auto self-center"
          >
            🚀 REGISTER NOW
          </button>
        </div>
      </div>

      {/* Enlarged Poster Modal */}
      {isEnlarged && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1A1A1D] bg-opacity-80 z-50">
          <div className="relative w-full max-w-5xl h-[95vh] flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-[#E1BEE7] text-5xl z-50 hover:text-red-500 transition-colors"
              onClick={() => setIsEnlarged(false)}
            >
              <IoCloseCircle />
            </button>
            <img
              src={eventDetails.poster}
              alt="Event Poster"
              className="w-full h-full object-contain rounded-xl shadow-2xl border-4 border-[#A64D79]"
            />
          </div>
        </div>
      )}

      {/* Photos Component */}
      <Photos logoImage={eventDetails.logo} members={members} />

      {/* Registration Popup */}
      {showRegPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <Reg eventName={eventDetails.name} onClose={handleCloseRegPopup} />

        </div>
      )}
    </div>
  );
};

export default EventsPage;

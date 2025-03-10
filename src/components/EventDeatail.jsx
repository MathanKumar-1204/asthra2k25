import React, { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

const EventsPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isEnlarged, setIsEnlarged] = useState(false);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEventDetails(data.TechInnovators2025))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);
  

  if (!eventDetails) {
    return <div className="text-center text-white">Loading event details...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1A1A1D] to-[#3B1C32] p-6 text-[#E1BEE7]">
      {/* Event Name */}
      <div className="bg-[#A64D79] px-8 py-3 rounded-full text-xl font-extrabold mb-6 shadow-lg text-[#1A1A1D] uppercase tracking-wider">
        {eventDetails.name}
      </div>

      <div className="flex flex-row w-full max-w-5xl items-center gap-8">
        {/* Left Side - Event Poster */}
        <div className="w-1/2 flex justify-center">
          <img 
            src={eventDetails.poster} 
            alt="Event Poster" 
            className="w-72 h-96 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:opacity-90 border-4 border-[#A64D79]" 
            onClick={() => setIsEnlarged(true)}
          />
        </div>

        {/* Right Side - Event Details */}
        <div className="w-1/2 flex flex-col space-y-6">
          {eventDetails.details.map((detail, index) => (
            <div key={index} className="bg-[#6A1E55] p-6 rounded-lg text-center text-[#E1BEE7] font-bold shadow-md hover:scale-105 transition-transform duration-300 hover:bg-[#BE3144]">
              {detail}
            </div>
          ))}
          <button className="mt-4 px-5 py-2.5 bg-[#BE3144] text-[#1A1A1D] font-bold rounded-md shadow-lg hover:bg-[#E17564] transition-all duration-300 transform hover:scale-110 hover:animate-pulse">
            🚀 REGISTER NOW
          </button>
        </div>
      </div>

      {/* Enlarged Poster Modal */}
      {isEnlarged && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1A1A1D] bg-opacity-80 z-50">
          <div className="relative max-w-3xl w-full p-4">
            <button
              className="absolute top-2 right-2 text-[#E1BEE7] text-4xl z-50 hover:text-red-500 transition-colors"
              onClick={() => setIsEnlarged(false)}
            >
              <IoCloseCircle />
            </button>
            <img 
              src={eventDetails.poster} 
              alt="Event Poster" 
              className="w-full h-96 rounded-xl shadow-2xl border-4 border-[#A64D79]" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
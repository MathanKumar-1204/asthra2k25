import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import eventsData from "./events.json";
import Photos from "./Photos";
import Reg from "./Reg";

const EventsPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [showRegPopup, setShowRegPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventId = params.get("eventId");
  const navigate = useNavigate();
  const members = eventDetails?.members
    ? Object.entries(eventDetails.members).map(([name, image]) => ({
        position: name,
        name,
        image,
      }))
    : [];

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

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;

      const registeredEvents = userInfo.registeredEvents || [];
      const isEventRegistered = registeredEvents.some((event) => event.eventName === eventDetails.name);

      if (isEventRegistered) {
        setIsRegistered(true);
      } else {
        try {
          const response = await fetch(
            `https://api.sheetbest.com/sheets/b0b06cc5-a1ef-41ee-b7c0-a123d92d771e?email=${userInfo.email}`
          );
          if (!response.ok) throw new Error("Failed to fetch user data");

          const data = await response.json();
          const userRegistration = data.find(
            (entry) => entry.email === userInfo.email && entry.eventName === eventDetails.name
          );

          if (userRegistration) {
            setIsRegistered(true);
            const updatedUserInfo = {
              ...userInfo,
              registeredEvents: [...registeredEvents, userRegistration],
            };
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
          }
        } catch (error) {
          console.error("Error fetching registration:", error);
        }
      }
    };

    if (eventDetails) {
      checkRegistrationStatus();
    }
  }, [eventDetails]);

  if (!eventDetails) {
    return <div className="text-center text-[#00FFFF] text-xl">Loading event details...</div>;
  }

  const handleRegisterClick = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setShowRegPopup(true);
    } else {
      navigate("/login");
    }
  };

  const handleCloseRegPopup = () => {
    setShowRegPopup(false);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gradient-to-br from-[#1A1A1D] to-[#3B1C32] p-6 text-[#E1BEE7] h-auto">
      {/* Event Title */}
      <div className="bg-[#00FFFF] px-8 py-4 rounded-full text-lg sm:text-3xl font-extrabold mb-8 shadow-lg text-[#1A1A1D] uppercase tracking-wider text-center w-full max-w-xs sm:max-w-md">
        {eventDetails.name}
      </div>

      <div className="flex flex-col sm:flex-row w-full max-w-6xl items-center gap-6 sm:gap-12">
        {/* Event Poster */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            src={eventDetails.poster}
            alt="Event Poster"
            className="w-full sm:w-[95%] sm:max-w-2xl h-auto rounded-xl shadow-lg shadow-[#00FFFF] cursor-pointer hover:scale-105 transition-all duration-300 hover:opacity-90 border-4 border-[#00FFFF]"
            onClick={() => setIsEnlarged(true)}
          />
        </div>

        {/* Event Details */}
        <div className="w-full sm:w-1/2 flex flex-col space-y-6 text-lg">
          {/* Rules Section */}
          <div className="bg-[#111] p-6 rounded-lg text-center text-[#00FFFF] font-bold shadow-md w-full border-2 border-[#00FFFF]">
            <h3 className="text-2xl font-bold mb-4 text-center underline">Rules</h3>
            <ul className="list-disc list-inside space-y-2 text-left">
              {eventDetails.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Team Members */}
          <div className="bg-[#111] p-6 rounded-lg text-center text-[#00FFFF] font-bold shadow-md w-full border-2 border-[#00FFFF]">
            <h3 className="text-2xl font-bold mb-2">Team Members</h3>
            <p>{eventDetails.teamMembers}</p>
          </div>

          {/* Slot Section */}
          <div className="bg-[#111] p-6 rounded-lg text-center text-[#00FFFF] font-bold shadow-md w-full border-2 border-[#00FFFF]">
            <h3 className="text-2xl font-bold mb-2">Slot</h3>
            <ul className="list-disc list-inside space-y-2 text-left">
              {eventDetails.slot.map((s, index) => (
                <li key={index}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Details and Prize Pool */}
      <div className="w-full max-w-6xl mt-6 flex flex-col sm:flex-row gap-6">
        {/* Contact Details */}
        <div className="bg-[#111] p-6 rounded-lg text-center text-[#00FFFF] font-bold shadow-md w-full border-2 border-[#00FFFF]">
          <h3 className="text-2xl font-bold mb-2">Contact Details</h3>
          <p>Phone: {eventDetails.phone}</p>
          <p>Coordinators: {eventDetails.coordinators.join(", ")}</p>
        </div>

        {/* Prize Pool (only for Tech Events) */}
        {eventDetails.type === "Tech" && (
          <div className="bg-[#111] p-6 rounded-lg text-center text-[#00FFFF] font-bold shadow-md w-full border-2 border-[#00FFFF]">
            <h3 className="text-2xl font-bold mb-2">Prize Pool</h3>
            <p>{eventDetails.prizePool}</p>
          </div>
        )}
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegisterClick}
        className="mt-4 px-5 py-2 bg-[#FF5733] text-white text-lg font-bold shadow-lg hover:bg-[#C70039] transition-all duration-300 transform hover:scale-110 hover:animate-pulse w-auto self-center border-2 border-[#00FFFF]"
        disabled={isRegistered}
      >
        {isRegistered ? "✔ REGISTERED" : "🚀 REGISTER NOW"}
      </button>

      {/* Enlarged Poster View */}
      {isEnlarged && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1A1A1D] bg-opacity-80 z-50">
          <div className="relative w-full max-w-5xl h-[95vh] flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-[#00FFFF] text-5xl z-50 hover:text-red-500 transition-colors"
              onClick={() => setIsEnlarged(false)}
            >
              <IoCloseCircle />
            </button>
            <img
              src={eventDetails.poster}
              alt="Event Poster"
              className="w-full h-full object-contain rounded-xl shadow-2xl border-4 border-[#00FFFF]"
            />
          </div>
        </div>
      )}

      {/* Photos Component */}
      {/* <Photos logoImage={eventDetails.logo} members={members} /> */}

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

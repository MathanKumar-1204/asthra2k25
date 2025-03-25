import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountdownClock from "./Clock";
import events from "./events.json";
import "./event.css";

const fadeInVariant = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const Events = () => {
  const navigate = useNavigate();
  const handleEventClick = (eventId) => {
    navigate(`/events-page?eventId=${encodeURIComponent(eventId)}`);
  };

  // Get arrays of events
  const techEvents = Object.entries(events.TechEvents);
  const nonTechEvents = Object.entries(events.NonTechEvents);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black p-4 md:p-10">
      {/* Countdown Clock Section */}
      <div className="w-full pt-10">
        <CountdownClock />
      </div>

      {/* Events Section */}
      <div className="relative w-full flex flex-col md:flex-row gap-8 md:gap-28 mt-8">
        {/* Left Column - Technical Events */}
        <div className="w-full md:w-1/2 flex flex-col space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00FFFF] text-center mb-8 neon-text">
            Technical Events
          </h2>
          {techEvents.map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              className="bg-gray-800 border border-[#00FFFF] text-white p-6 rounded-lg shadow-lg shadow-[#00FFFF] w-full md:w-3/4 h-36 cursor-pointer flex items-center justify-center text-xl font-semibold hover:bg-gray-700 transition-colors mx-auto"
              variants={fadeInVariant("left")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
            >
              {event.name}
            </motion.div>
          ))}
        </div>

        {/* Right Column - Non-Technical Events */}
        <div className="w-full md:w-1/2 flex flex-col space-y-10 mt-8 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] text-center mb-8 neon-text">
            Non-Technical Events
          </h2>
          {nonTechEvents.map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              className="bg-gray-700 border border-yellow-500 text-white p-6 rounded-lg shadow-lg shadow-yellow-500 w-full md:w-3/4 h-36 cursor-pointer flex items-center justify-center text-xl font-semibold hover:bg-gray-600 transition-colors mx-auto"
              variants={fadeInVariant("right")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
            >
              {event.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

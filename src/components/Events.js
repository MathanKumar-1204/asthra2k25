import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
    <div className="flex justify-center items-center min-h-screen bg-black p-10">
      <div className="relative w-full flex gap-28 mt-20"> {/* Increased space between columns */}

        {/* Left Column - Technical Events */}
        <div className="w-1/2 flex flex-col space-y-10">
          <h2 className="text-3xl font-bold text-[#00FFFF] text-center mb-8 neon-text">
            Technical Events
          </h2>
          {techEvents.map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              className="bg-gray-800 border border-[#00FFFF] text-white p-6 rounded-lg shadow-lg shadow-[#00FFFF] w-3/4 h-36 cursor-pointer flex items-center justify-center text-xl font-semibold hover:bg-gray-700 transition-colors"
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

        {/* Right Column - Non-Technical Events (Inserted Between Tech Events) */}
        <div className="w-1/2  flex flex-col space-y-10 mt-16" > {/* Adjusted spacing */}
          <h2 className="text-3xl font-bold text-[#FFD700] text-center mb-8 neon-text">
            Non-Technical Events
          </h2>
          {nonTechEvents.map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              className="bg-gray-700 border border-yellow-500  text-white p-6 rounded-lg shadow-lg shadow-yellow-500 w-3/4 h-36 cursor-pointer flex items-center justify-center text-xl font-semibold hover:bg-gray-600 transition-colors"
              variants={fadeInVariant("right")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
              style={{ marginLeft: "10rem",marginTop: "3rem" }}
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

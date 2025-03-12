import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import events from "./events.json";

const fadeInVariant = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const Events = () => {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/events-page?eventId=${encodeURIComponent(eventId)}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-10">
      <div className="relative w-3/4 flex gap-32 mt-80">
        {/* Left Column - Technical Events */}
        <div className="w-1/2 flex flex-col space-y-10">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Technical Events
          </h2>
          {Object.entries(events.TechEvents).map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-4/5 h-20 cursor-pointer flex items-center justify-center text-xl font-semibold"
              variants={fadeInVariant(index % 2 === 0 ? "left" : "right")}
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
        <div className="w-1/2 flex flex-col space-y-10">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Non-Technical Events
          </h2>
          {Object.entries(events.NonTechEvents).map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-4/5 h-20 cursor-pointer flex items-center justify-center text-xl font-semibold"
              variants={fadeInVariant(index % 2 === 0 ? "right" : "left")}
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

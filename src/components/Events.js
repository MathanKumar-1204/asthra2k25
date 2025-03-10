import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const events = [
  { id: 1, title: "Event 1", description: "Description for event 1" },
  { id: 2, title: "Event 2", description: "Description for event 2" },
  { id: 3, title: "Event 3", description: "Description for event 3" },
  { id: 4, title: "Event 4", description: "Description for event 4" },
  { id: 5, title: "Event 5", description: "Description for event 5" },
  { id: 6, title: "Event 6", description: "Description for event 6" },
  { id: 7, title: "Event 7", description: "Description for event 7" },
  { id: 8, title: "Event 8", description: "Description for event 8" },
  { id: 9, title: "Event 9", description: "Description for event 9" },
];

const fadeInVariant = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const Events = () => {
  const navigate = useNavigate(); // React Router navigation

  const handleEventClick = (event) => {
    // Navigate to /event-details?title=Event%201&desc=Description%20for%20event%201
    navigate(`/event-details?title=${encodeURIComponent(event.title)}&desc=${encodeURIComponent(event.description)}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-10">
      <div className="relative w-3/4 flex gap-32 mt-80">
        {/* Left Column - Technical Events */}
        <div className="w-1/2 flex flex-col space-y-10">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Technical Events</h2>
          {events.slice(0, 5).map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-4/5 h-48 cursor-pointer"
              variants={fadeInVariant(index % 2 === 0 ? "left" : "right")}
              initial="hidden"
              animate="visible" // Keeps the animation active
              exit="hidden" // Plays animation when navigating away
              whileHover={{ scale: 1.05 }} // Hover effect
              whileTap={{ scale: 0.95 }} // Click effect
              onClick={() => handleEventClick(event)}
            >
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <p className="text-base">{event.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Right Column - Non-Technical Events */}
        <div className="w-1/2 flex flex-col space-y-16 mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Non-Technical Events</h2>
          {events.slice(5, 9).map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-4/5 h-48 cursor-pointer"
              variants={fadeInVariant(index % 2 === 0 ? "right" : "left")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(event)}
            >
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <p className="text-base">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountdownClock from "./Clock";
import events from "./events.json";
import "./event.css";
import TiltedCard from './TiltedCard';

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
    <div className="flex flex-col items-center w-full min-h-screen bg-black p-4 md:p-10 md:pl-32 overflow-x-hidden">
      {/* Countdown Clock Section */}
      <div className="w-full pt-10">
        <CountdownClock />
      </div>

      {/* Events Section */}
      <div className="relative w-full flex flex-col md:flex-row gap-8 md:gap-28 mt-8 md:ml-36">
        {/* Left Column - Technical Events */}
        <div className="w-full md:w-1/2 flex flex-col space-y-10">
          <h2 className="text-2xl md:text-3xl md:mr-48 font-bold text-[#00FFFF] text-center mb-8 neon-text">
            Technical Events
          </h2>
          {techEvents.map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              variants={fadeInVariant("left")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
              className="cursor-pointer"
            >
              <TiltedCard
                imageSrc={event.logo}
                altText={event.name}
                captionText={event.name}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    {event.description || event.name}
                  </p>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Right Column - Non-Technical Events */}
        <div className="w-full md:w-1/2 flex flex-col space-y-10 mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl md:mr-56 font-bold text-[#FFD700] text-center mb-8 neon-text">
            Non-Technical Events
          </h2>
          {nonTechEvents.map(([eventId, event], index) => (
            <motion.div
              key={eventId}
              variants={fadeInVariant("right")}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
              className="cursor-pointer"
            >
              <TiltedCard
                imageSrc={event.logo}
                altText={event.name}
                captionText={event.name}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text h-4">
                    {event.description || event.name}
                  </p>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountdownClock from "./Clock";
import events from "./events.json";
import "./event.css";
import TiltedCard from "./TiltedCard";

const fadeInVariant = (direction, isMobile) => ({
  hidden: { 
    opacity: 0, 
    x: isMobile ? 0 : direction === "left" ? -100 : 100,
    y: isMobile ? 50 : 0
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
});

const Events = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events-page?eventId=${encodeURIComponent(eventId)}`);
  };

  const techEvents = Object.entries(events.TechEvents);
  const nonTechEvents = Object.entries(events.NonTechEvents);

  return (
    <div className="events-container">
      {/* Countdown Clock Section */}
      <div className="countdown-section">
        <CountdownClock />
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="headings-wrapper">
        <h2 className="section-title tech-title">Technical Events</h2>
        <h2 className="section-title non-tech-title mt-20">Non-Technical Events</h2>
      </div>

      <div className="events-wrapper">
        {/* Technical Events Column */}
        <div className="events-column tech-column">
          {techEvents.map(([eventId, event], index) => (
            <motion.div
              key={`desktop-tech-${eventId}`}
              variants={fadeInVariant("left", false)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
              className="event-card"
            >
              <div className="curved-box">
                <h3>{event.name}</h3>
              </div>
              <div className="image-container">
                <TiltedCard
                  imageSrc={event.logo}
                  altText={event.name}
                  captionText={event.name}
                  containerHeight={"250px"}
                  containerWidth={"250px"}
                  imageHeight={"280px"}
                  imageWidth={"270px"}
                  rotateAmplitude={8}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
              <p className="event-description">{event.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Gap between columns */}
        <div className="gap"></div>

        {/* Non-Technical Events Column */}
        <div className="events-column non-tech-column vertical-offset">
  {nonTechEvents.map(([eventId, event], index) => (
    <motion.div
      key={`desktop-non-tech-${eventId}`}
      variants={fadeInVariant("right", false)}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleEventClick(eventId)}
      className="event-card"
    >
      <div className="curved-box">
        <h3>{event.name}</h3>
      </div>
      <div className="image-container">
        <TiltedCard
          imageSrc={event.logo}
          altText={event.name}
          captionText={event.name}
          containerHeight={"250px"}
          containerWidth={"250px"}
          imageHeight={"280px"}
          imageWidth={"270px"}
          rotateAmplitude={8}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
        />
      </div>
      <p className="event-description">{event.description}</p>
    </motion.div>
  ))}
</div>

      </div>

      {/* Mobile Layout - Sequential */}
      <div className="mobile-section">
        {/* Technical Events Section */}
        <div className="mobile-heading">
          <h2 className="section-title tech-title">Technical Events</h2>
        </div>
        <div className="mobile-events mobile-tech-section">
          {techEvents.map(([eventId, event], index) => (
            <motion.div
              key={`mobile-tech-${eventId}`}
              variants={fadeInVariant("left", true)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
              className="event-card"
            >
              <div className="curved-box">
                <h3>{event.name}</h3>
              </div>
              <div className="image-container">
                <TiltedCard
                  imageSrc={event.logo}
                  altText={event.name}
                  captionText={event.name}
                  containerHeight={"220px"}
                  containerWidth={"180px"}
                  imageHeight={"220px"}
                  imageWidth={"180px"}
                  rotateAmplitude={4}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
              <p className="event-description">{event.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Non-Technical Events Section */}
        <div className="mobile-heading">
          <h2 className="section-title non-tech-title ">Non-Technical Events</h2>
        </div>
        <div className="mobile-events mobile-non-tech-section">
          {nonTechEvents.map(([eventId, event], index) => (
            <motion.div
              key={`mobile-non-tech-${eventId}`}
              variants={fadeInVariant("right", true)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEventClick(eventId)}
              className="event-card"
            >
              <div className="curved-box">
                <h3>{event.name}</h3>
              </div>
              <div className="image-container">
                <TiltedCard
                  imageSrc={event.logo}
                  altText={event.name}
                  captionText={event.name}
                  containerHeight={"220px"}
                  containerWidth={"180px"}
                  imageHeight={"220px"}
                  imageWidth={"180px"}
                  rotateAmplitude={4}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
              <p className="event-description">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
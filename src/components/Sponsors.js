import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  { id: 1, name: "Sponsor 1", image: "https://via.placeholder.com/300" },
  { id: 2, name: "Sponsor 2", image: "https://via.placeholder.com/300" },
  { id: 3, name: "Sponsor 3", image: "https://via.placeholder.com/300" },
  { id: 4, name: "Sponsor 4", image: "https://via.placeholder.com/300" },
  { id: 5, name: "Sponsor 5", image: "https://via.placeholder.com/300" },
  { id: 6, name: "Sponsor 6", image: "https://via.placeholder.com/300" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Sponsors = () => {
  return (
    <motion.div
      id="logo-section"
      className="w-full h-screen flex flex-col justify-center items-start bg-black text-white pl-20" // Adjusted alignment
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <h2 className="text-4xl font-bold flex flex-col justify-center text-[#00FFFF] mb-10 neon-text tracking-wider">
        Our Sponsors
      </h2>

      {/* Sponsor Grid */}
      <motion.div
        className="grid grid-cols-3 gap-12 p-6 justify-start" // Align items to the left
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            className="p-6 rounded-xl border-2 border-[#00FFFF] bg-[#111] shadow-lg shadow-[#00FFFF] flex items-center justify-start w-48 h-48 
                      transition-all duration-300 ease-in-out hover:shadow-cyan-500 hover:scale-105"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #00FFFF" }}
            whileTap={{ scale: 0.95 }}
            variants={fadeIn}
          >
            <img
              src={sponsor.image}
              alt={sponsor.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sponsors;

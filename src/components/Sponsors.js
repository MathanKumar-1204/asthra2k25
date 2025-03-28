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
      className="w-screen h-screen flex flex-col justify-center items-start bg-black text-white pl-8 md:pl-20"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#00FFFF] mb-10 tracking-wider">
        Our Sponsors
      </h2>

      {/* Sponsor Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 md:p-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            className="p-4 md:p-6 rounded-xl border-2 border-[#00FFFF] bg-[#111] shadow-lg shadow-[#00FFFF] flex items-center justify-center w-full h-40 md:w-48 md:h-48 transition-transform duration-300 ease-in-out hover:scale-105"
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

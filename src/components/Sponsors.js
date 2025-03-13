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
      className="mt-[10vh] w-full h-screen flex flex-col justify-center items-center bg-black text-white"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-3 gap-8 mt-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center w-48 h-48"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeIn}
          >
            <img src={sponsor.image} alt={sponsor.name} className="w-full h-full object-contain" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sponsors;
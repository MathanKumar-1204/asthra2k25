import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const EventDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const title = params.get("title");
  const description = params.get("desc");

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-900"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg mt-4">{description}</p>
      </div>
    </motion.div>
  );
};

export default EventDetails;

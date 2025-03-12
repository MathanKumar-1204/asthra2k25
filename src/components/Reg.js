import React, { useState, useEffect } from "react";
import ShinyText from "./ShinyText";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";

const Reg = ({ eventName, onClose }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamLead: "",
    teamMembers: "",
    contact: "",
    college: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch('https://api.sheetbest.com/sheets/9da660eb-f87b-4f55-b372-3866f12aa437', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data from SheetBest');
        }

        const data = await response.json();
        setSheetData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSheetData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      console.error("User not logged in");
      return;
    }
  
    const userEmail = userInfo.email;
    const userRow = sheetData.find(row => row.email === userEmail);
  
    if (!userRow) {
      console.error("User not found in sheet");
      return;
    }
  
    const updatedRow = {
      ...userRow,
      ...formData,
      eventName: eventName, // Ensure eventName is included
    };
  
    console.log("Updating row with data:", updatedRow); // Log the data being sent
  
    try {
      const response = await fetch('https://api.sheetbest.com/sheets/9da660eb-f87b-4f55-b372-3866f12aa437', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any required authentication headers here
        },
        body: JSON.stringify(updatedRow),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update data in SheetBest:', errorText);
        throw new Error('Failed to update data in SheetBest');
      }
  
      console.log('Data updated successfully');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  
  

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      teamName: "",
      teamLead: "",
      teamMembers: "",
      contact: "",
      college: "",
    });
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl w-full max-w-md border-2 border-purple-500 animate-borderGlow transition-opacity duration-500"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white text-xl font-bold hover:text-red-500 transition-all duration-300 border border-transparent hover:border-red-500 p-2 rounded-full shadow-md hover:shadow-red-500 animate-xGlow"
          >
            ✖
          </button>

          <h2 className="text-3xl font-bold text-white text-center mb-6 animate-textGlow">
            Team Registration for {eventName} 🏆
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                name="teamLead"
                placeholder="Team Lead Name"
                value={formData.teamLead}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                name="teamMembers"
                placeholder="Team Members"
                value={formData.teamMembers}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="number"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={formData.college}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-300 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-purple-1000 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-purple-900 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-purple-500"
              >
                <ShinyText>Register Now</ShinyText>
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4 animate-textGlow">🎉 Registration Successful! 🎉</h2>
              <p className="text-white">Thank you for registering. We will contact you soon!</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes textGlow {
            0% { text-shadow: 0 0 10px #8a2be2, 0 0 20px #8a2be2; }
            50% { text-shadow: 0 0 20px #8a2be2, 0 0 30px #8a2be2; }
            100% { text-shadow: 0 0 10px #8a2be2, 0 0 20px #8a2be2; }
          }

          .animate-textGlow {
            animation: textGlow 1.5s infinite alternate;
          }

          @keyframes borderGlow {
            0% { box-shadow: 0 0 10px #8a2be2; }
            50% { box-shadow: 0 0 20px #8a2be2; }
            100% { box-shadow: 0 0 10px #8a2be2; }
          }

          .animate-borderGlow {
            animation: borderGlow 2s infinite alternate;
          }

          @keyframes xGlow {
            0% { text-shadow: 0 0 5px red, 0 0 10px red; }
            50% { text-shadow: 0 0 10px red, 0 0 15px red; }
            100% { text-shadow: 0 0 5px red, 0 0 10px red; }
          }

          .animate-xGlow {
            animation: xGlow 1s infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default Reg;

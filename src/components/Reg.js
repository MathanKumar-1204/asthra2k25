import React, { useState, useEffect } from "react";
import ShinyText from "./ShinyText";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";

const API_URL = "https://api.sheetbest.com/sheets/b0b06cc5-a1ef-41ee-b7c0-a123d92d771e";
const EMAIL_API_URL = "http://localhost:5000/send-confirmation"; // Update with your Flask backend URL

const Reg = ({ eventName, onClose }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamLead: "",
    teamMembers: "",
    contact: "",
    college: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRegistration = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.email) {
        console.error("User not logged in");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}?email=${userInfo.email}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        const userRegistration = data.find((entry) => entry.email === userInfo.email);

        if (userRegistration) {
          console.log("User already registered:", userRegistration);
          setFormData({
            teamName: userRegistration.teamName || "",
            teamLead: userRegistration.teamLead || "",
            teamMembers: userRegistration.teamMembers || "",
            contact: userRegistration.contact || "",
            college: userRegistration.college || "",
          });
        }
      } catch (error) {
        console.error("Error fetching registration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRegistration();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.email) {
      console.error("User not logged in");
      return;
    }

    const newEntry = {
      email: userInfo.email,
      teamName: formData.teamName,
      teamLead: formData.teamLead,
      teamMembers: formData.teamMembers,
      contact: formData.contact,
      college: formData.college,
      eventName: eventName,
    };

    console.log("Sending data:", newEntry);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([newEntry]),
      });

      if (!response.ok) throw new Error("Failed to store data");

      console.log("Registration successful!");
      setIsSubmitted(true);

      // Send email confirmation
      await fetch(EMAIL_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email,
          teamName: formData.teamName,
          teamLead: formData.teamLead,
          teamMembers: formData.teamMembers,
          contact: formData.contact,
          college: formData.college,
          eventName: eventName,
        }),
      });

      console.log("Email confirmation sent!");
    } catch (error) {
      console.error("Error storing data or sending email:", error);
    }
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
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-xl font-bold hover:text-red-500 transition-all duration-300 border border-transparent hover:border-red-500 p-2 rounded-full shadow-md hover:shadow-red-500 animate-xGlow"
          >
            ✖
          </button>

          <h2 className="text-3xl font-bold text-white text-center mb-6 animate-textGlow">
            Team Registration for {eventName} 🏆
          </h2>

          {isLoading ? (
            <p className="text-center text-white">Loading...</p>
          ) : isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4 animate-textGlow">🎉 Registration Successful! 🎉</h2>
              <p className="text-white">Thank you for registering. We will contact you soon!</p>
            </div>
          ) : (
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
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Reg;

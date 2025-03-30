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
    teamMembersEmail: "", // New field for team members' email IDs
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
            teamMembersEmail: userRegistration.teamMembersEmail || "", // Update the new field
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
      teamMembersEmail: formData.teamMembersEmail, // Include the new field
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
        body: JSON.stringify(newEntry),
      });

      console.log("Email confirmation sent!");
    } catch (error) {
      console.error("Error storing data or sending email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[25vh] bg-black animate-gradient bg-[radial-gradient(circle_at_top_left,_#000,_#0ff,_#000)]">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-black/80 backdrop-blur-lg shadow-xl p-8 rounded-2xl w-full max-w-md border-2 border-cyan-400 animate-borderGlow"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-cyan-400 text-2xl font-bold hover:text-cyan-300 transition-all duration-300 border border-transparent hover:border-cyan-300 p-2 rounded-full shadow-md hover:shadow-cyan-500 animate-xGlow"
          >
            ✖
          </button>

          <h2 className="text-3xl font-bold text-cyan-300 text-center mb-6 animate-textGlow">
            Team Registration for {eventName} 🏆
          </h2>

          {isLoading ? (
            <p className="text-center text-cyan-300">Loading...</p>
          ) : isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4 animate-textGlow">🎉 Registration Successful! 🎉</h2>
              <p className="text-cyan-300">Thank you for registering. We will contact you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map((field) => (
                <input
                  key={field}
                  type= "mail"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/60 text-cyan-300 border border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all duration-300"
                />
              ))}
              <button
                type="submit"
                className="w-full bg-cyan-500 text-black font-semibold py-2 rounded-lg mt-4 hover:bg-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500 animate-pulse"
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

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Front = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const modalRef = useRef(null);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseLogin();
      }
    };

    if (showLogin) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showLogin]);

  return (
    <div className="h-screen bg-gradient-to-b from-purple-900 to-indigo-800 flex flex-col items-center relative p-6 overflow-y-scroll overflow-x-hidden text-gray-100 font-sans">
      <div className="absolute top-6 left-6 bg-white shadow-xl rounded-full w-24 h-24 flex items-center justify-center text-lg font-extrabold text-purple-900 border-4 border-purple-700 transform hover:scale-110 transition duration-300">
        LOGO
      </div>

      <div className="absolute top-6 right-6 flex space-x-4">
        <button
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-pink-500 to-red-500 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-white hover:opacity-90 transition duration-300 transform hover:scale-105"
        >
          LOGIN
        </button>
        <button className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-white hover:opacity-90 transition duration-300 transform hover:scale-105">
          EVENTS
        </button>
      </div>

      <div className="mt-24 bg-white px-16 py-10 rounded-2xl shadow-2xl text-center text-4xl font-extrabold text-purple-900 border-4 border-purple-700 animate-bounce">
        ASTHRA
      </div>

      <div className="mt-12 text-yellow-400 text-2xl font-extrabold tracking-widest drop-shadow-lg animate-pulse">
        CAPTION
      </div>

      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Login />
        </div>
      )}

      <div className="absolute bottom-0 w-full h-40 bg-white rounded-t-full shadow-2xl border-t-4 border-purple-700"></div>
    </div>
  );
};

export default Front;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

const Front = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const modalRef = useRef(null);
  const vantaRef = useRef(null);

  const handleLoginClick = () => {
    setShowLogin(true); // Show login modal
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate("/");
  };

  const handleEventClick = () => {
    const eventsSection = document.getElementById("events");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAdminClick = () => {
    navigate("/admin"); // Navigate to admin page
  };

  const handleCloseLogin = () => setShowLogin(false);

  // Close modal when clicking outside
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

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

  // Vanta.js Background Effect
  useEffect(() => {
    vantaRef.current = GLOBE({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 0.8,
      color: 0x5fb32f,
      size: 1.4,
      backgroundColor: 0x0,
      THREE: THREE, // Required for Vanta.js in React
    });

    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="vanta"
      className="h-screen bg-black flex flex-col items-center relative p-6 overflow-y-scroll overflow-x-hidden text-gray-100 font-sans"
    >
      <div className="absolute top-6 left-6 bg-gray-600 shadow-xl rounded-full w-24 h-24 flex items-center justify-center text-lg font-extrabold text-black border-4 border-gray-500 transform hover:scale-110 transition duration-300">
        LOGO
        {userInfo && ` - ${userInfo.name}`}
      </div>

      <div className="absolute top-6 right-6 flex space-x-4">
        {userInfo ? (
          <>
            <button
              onClick={handleLogoutClick}
              className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
            >
              LOGOUT
            </button>
            {userInfo.role === "admin" ? (
              <button
                onClick={handleAdminClick}
                className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
              >
                ADMIN
              </button>
            ) : null}
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
          >
            LOGIN
          </button>
        )}
        <button
          onClick={handleEventClick}
          className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
        >
          EVENTS
        </button>
      </div>

      <div className="mt-24 bg-gray-600 px-16 py-10 rounded-2xl shadow-2xl text-center text-4xl font-extrabold text-black border-4 border-gray-600 animate-spin-slow ">
        ASTHRA
      </div>

      <div className="mt-12 text-yellow-400 text-2xl font-extrabold tracking-widest drop-shadow-lg animate-pulse">
        CAPTION
      </div>

      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef}>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Front;

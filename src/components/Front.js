import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import GlitchText from './Glitch';

const Front = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);
  const vantaRef = useRef(null);

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  // Close modal or sidebar when clicking outside
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseLogin();
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (showLogin || menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showLogin, menuOpen]);

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
      scaleMobile: 0.5,
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
      className="h-screen bg-black flex flex-col items-center relative p-6 text-gray-100 font-sans"
    >
      <div className="absolute top-6 left-6 bg-gray-600 shadow-xl rounded-full w-24 h-24 flex items-center justify-center text-lg font-extrabold text-black border-4 border-gray-500 transform hover:scale-110 transition duration-300 md:w-20 md:h-20 md:text-sm">
        {userInfo && `${userInfo.name}`}
      </div>

      <div className="absolute top-6 right-6 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-auto bg-black p-4 shadow-lg transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col space-y-4`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-2 right-2 text-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        {userInfo ? (
          <>
            <button
              onClick={handleLogoutClick}
              className="bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
            >
              LOGOUT
            </button>
            {userInfo.role === "admin" && (
              <button
                onClick={handleAdminClick}
                className="bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
              >
                ADMIN
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
          >
            LOGIN
          </button>
        )}
        <button
          onClick={handleEventClick}
          className="bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
        >
          EVENTS
        </button>
      </div>

      <div className="hidden md:flex absolute top-6 right-6 flex space-x-4 flex-wrap justify-center">
        {userInfo ? (
          <>
            <button
              onClick={handleLogoutClick}
              className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              LOGOUT
            </button>
            {userInfo.role === "admin" && (
              <button
                onClick={handleAdminClick}
                className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                ADMIN
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            LOGIN
          </button>
        )}
        <button
          onClick={handleEventClick}
          className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          EVENTS
        </button>
      </div>

      <GlitchText
        speed={1}
        enableShadows={true}
        enableOnHover={true}
        className="custom-class mt-20 text-green-300 md:mt-10"
      >
        ASTHRA2K25
      </GlitchText>

      <div className="mt-16 text-yellow-400 text-2xl font-extrabold tracking-widest drop-shadow-lg animate-pulse md:mt-12 md:text-xl">
        19TH NATIONAL LEVEL TECHNICAL SYMPOSIUM
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

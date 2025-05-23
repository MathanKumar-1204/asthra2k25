import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import GlitchText from "./Glitch";
import "./front.css";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";
import { LucideMenu } from 'lucide-react'; // Import the hamburger icon

const Front = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));

    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x359028,
          backgroundColor: 0x000000,
        })
      );
    }

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogin(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (showLogin || menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showLogin, menuOpen, vantaEffect]);

  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/");
  };
  const handleEventClick = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleAdminClick = () => navigate("/ad");
  const handleRegisteredClick = () => navigate("/registered");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="w-screen h-screen flex flex-col items-center relative p-6 text-gray-100 font-sans overflow-hidden">
      <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full z-[-1]" />

      {/* Username Circle */}
      {userInfo && (
        <div className="absolute top-6 left-6 bg-gray-600 shadow-xl rounded-full w-24 h-24 flex items-center justify-center text-lg font-extrabold text-black border-4 border-gray-500 transform hover:scale-110 transition duration-300 md:w-20 md:h-20 md:text-sm">
          {userInfo.name}
        </div>
      )}

      <div className="absolute top-6 right-6 md:hidden z-40">
        <button onClick={toggleMenu} className="text-gray-100 bg-green-950 focus:outline-none">
          <LucideMenu className="w-10 h-10" /> {/* Use the hamburger icon */}
        </button>
      </div>

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full bg-black p-4 shadow-lg transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden flex flex-col space-y-4`}
      >
        <button onClick={closeMenu} className="absolute top-2 right-2 text-gray-100 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {userInfo ? (
          <>
            <button onClick={handleLogoutClick} className="neon-button bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105">
              LOGOUT
            </button>
            {userInfo.role === "admin" && (
              <button onClick={handleAdminClick} className="neon-button bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105">
                ADMIN
              </button>
            )}
            <button onClick={handleRegisteredClick} className="neon-button bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105">
              REGISTERED
            </button>
          </>
        ) : (
          <button onClick={handleLoginClick} className="neon-button bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105">
            LOGIN
          </button>
        )}

        <button onClick={handleEventClick} className="neon-button bg-gray-600 shadow-lg px-4 py-2 text-sm font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105">
          EVENTS
        </button>
      </div>

      <div className="hidden md:flex absolute top-6 right-6 flex space-x-4 flex-wrap justify-center">
        {userInfo ? (
          <>
            <button onClick={handleLogoutClick} className="neon-button bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto">
              LOGOUT
            </button>
            {userInfo.role === "admin" && (
              <button onClick={handleAdminClick} className="neon-button bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                ADMIN
              </button>
            )}
          </>
        ) : (
          <button onClick={handleLoginClick} className="neon-button bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto">
            LOGIN
          </button>
        )}
        <button onClick={handleEventClick} className="neon-button bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto">
          EVENTS
        </button>
      </div>

      <GlitchText speed={1} enableShadows={true} enableOnHover={true} className="custom-class mt-36 text-green-300 md:mt-10">
        ASTHRA2K25
      </GlitchText>

      <div className="mt-24 text-yellow-400 text-2xl font-extrabold tracking-widest drop-shadow-lg animate-pulse md:mt-12 md:text-xl">
        19TH NATIONAL LEVEL TECHNICAL SYMPOSIUM
      </div>

      {userInfo && (
      <button
      onClick={handleRegisteredClick}
      className="neon-button bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105 w-full sm:w-auto md:block hidden"
      style={{ position: "absolute", bottom: "20px", right: "20px", fontFamily: "'Orbitron', sans-serif" }}
    >
      REGISTERED
    </button>
      )}

      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef}><Login /></div>
        </div>
      )}
    </div>
  );
};

export default Front;

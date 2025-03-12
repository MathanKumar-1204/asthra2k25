import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const Front = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Initialize Vanta Effect
    if (vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current, // Attach to div
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 500.00,
        minWidth: 500.00,
        scale: 1.0, // Scale must be set properly
        scaleMobile: 1.2, // Mobile scaling
        color: 0xff0000, // RED (Change as needed)
        backgroundColor: 0x000000, // BLACK
        points: 10.0, // Adjust node points
        maxDistance: 20.0, // Distance between connections
        spacing: 20.0, // Space between nodes
        THREE: THREE,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div
    id="front"
      ref={vantaRef}
      className="h-screen bg-black flex flex-col items-center relative p-6 overflow-y-scroll overflow-x-hidden text-gray-100 font-sans"
    >
      {/* LOGO */}
      <div className="absolute top-6 left-6 bg-gray-600 shadow-xl rounded-full w-24 h-24 flex items-center justify-center text-lg font-extrabold text-black border-4 border-gray-500 transform hover:scale-110 transition duration-300">
        LOGO
        {userInfo && ` - ${userInfo.name}`}
      </div>

      {/* LOGIN & BUTTONS */}
      <div className="absolute top-6 right-6 flex space-x-4">
        {userInfo ? (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("userInfo");
                setUserInfo(null);
                navigate("/");
              }}
              className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
            >
              LOGOUT
            </button>
            {userInfo.role === "admin" ? (
              <button
                onClick={() => navigate("/admin")}
                className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
              >
                ADMIN
              </button>
            ) : (
              <button
                onClick={() =>
                  document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
              >
                EVENTS
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
            >
              LOGIN
            </button>
            <button
              onClick={() =>
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gray-600 shadow-lg px-6 py-3 text-md font-bold rounded-xl text-black hover:opacity-90 transition duration-300 transform hover:scale-105"
            >
              EVENTS
            </button>
          </>
        )}
      </div>

      {/* TITLE */}
      <div className="mt-24 bg-gray-600 px-16 py-10 rounded-2xl shadow-2xl text-center text-4xl font-extrabold text-black border-4 border-gray-600 animate-spin-slow">
        ASTHRA
      </div>

      <div className="mt-12 text-yellow-400 text-2xl font-extrabold tracking-widest drop-shadow-lg animate-pulse">
        CAPTION
      </div>
    </div>
  );
};

export default Front;

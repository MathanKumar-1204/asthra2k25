import React from "react";
import SplitText from "./SplitText";

const Sympo = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex justify-end items-center py-10 font-mono">
      {/* Right Side - Main Section (75% Width) */}
      <div className="w-3/5 flex flex-col items-start mr-10">
        {/* Symposium Details */}
        <div className="w-full p-6 neon-border-glow text-white rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-3xl font-bold text-cyan-400 neon-text">Symposium 2025</h2>
          <SplitText
            text="Asthra is a national level technical symposium held annually in our college. It is wholly organised and co-ordinated by our students and supported by the management and staff of Information Technology. Asthra is a stepping stone for students to showcase their technical expertise and talent on a grand stage."
            className="text-lg text-gray-300 text-left"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.5}
            rootMargin="-50px"
          />
        </div>

        {/* Logo Section (Symposium Logo & College Logo) */}
        <div className="w-full flex justify-between mt-8">
          <img
            src="./assets/sympo-logo.webp"
            alt="Symposium Logo"
            className="w-60 h-40 object-cover rounded-lg shadow-neon border-2 border-pink-400"
          />
          <img
            src="./assets/msec.webp"
            alt="College Logo"
            className="w-60 h-40 object-cover rounded-lg shadow-neon border-2 border-cyan-400"
          />
        </div>

        {/* College Description */}
        <div className="w-full mt-8 p-6 neon-border-glow rounded-lg shadow-lg backdrop-blur-md">
          <h3 className="text-2xl font-semibold text-pink-400 neon-text">Meenakshi Sundararajan Engineering College</h3>
          <SplitText
            text="Meenakshi Sundararajan Engineering College (MSEC), founded by the IIET Society in 2001, is part of the KRS Group of Institutions. Known for quality education and discipline, the KRS Campus also includes IIET (est. 1947), Meenakshi College for Women, and Meenakshi Sundararajan School of Management."
            className="text-lg text-gray-300 text-left"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.5}
            rootMargin="-50px"
          />
        </div>
      </div>
    </div>
  );
};

export default Sympo;

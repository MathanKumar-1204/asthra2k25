import React from "react";
import SplitText from "./SplitText";

const Sympo = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center py-10 font-mono px-4">
      {/* Main Section */}
      <div className="w-full flex flex-col items-center md:items-start md:w-4/5 md:mr-10">
        {/* Symposium Details */}
        <div className="w-full p-6 neon-border-glow text-white rounded-lg shadow-lg backdrop-blur-md mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 neon-text md:text-3xl">Symposium 2025</h2>
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
        <div className="w-full flex justify-center md:justify-between items-center space-x-4">
          <img
            src="./assets/logo.jpeg"
            alt="Symposium Logo"
            className="w-32 h-20 md:w-48 md:h-32 object-cover rounded-lg shadow-neon border-2 border-pink-400"
          />
          <img
            src="./assets/msec.webp"
            alt="College Logo"
            className="w-32 h-20 md:w-48 md:h-32 object-cover rounded-lg shadow-neon border-2 border-cyan-400"
          />
        </div>

        {/* College Description */}
        <div className="w-full mt-8 p-6 neon-border-glow rounded-lg shadow-lg backdrop-blur-md">
          <h3 className="text-xl font-semibold text-pink-400 neon-text md:text-2xl">Meenakshi Sundararajan Engineering College</h3>
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

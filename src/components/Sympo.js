import React from "react";
import SplitText from "./SplitText";
import ClickSpark from './ClickSpark';

const Sympo = () => {
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="w-full h-screen bg-black text-white flex flex-col items-center py-10 font-mono px-4">
        <div className="text-xl md:text-2xl font-bold text-cyan-400 neon-text">
          <h2>ABOUT US</h2>
        </div>

        {/* Main Section */}
        <div className="w-full md:w-[70%] md:ml-auto flex flex-col items-center md:items-start md:pr-10">
          {/* Symposium Details */}
          <div className="w-full p-6 neon-border-glow text-white rounded-lg shadow-lg backdrop-blur-md mb-8">
            <h2 className="text-lg md:text-2xl font-bold text-cyan-400 neon-text">Asthra2K25</h2>
            <SplitText
              text="Asthra is a national level technical symposium held annually in our college. It is wholly organised and co-ordinated by our students and supported by the management and staff of Information Technology. Asthra is a stepping stone for students to showcase their technical expertise and talent on a grand stage."
              className="text-sm md:text-lg text-gray-300 text-left"
              delay={10}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.5}
              rootMargin="-50px"
            />
          </div>

          {/* Logo Section (Symposium Logo & College Logo) */}
          <div className="w-full flex flex-row justify-center md:justify-start items-center space-x-4 mb-8">
            <img
              src="./assets/logo.jpeg"
              alt="Symposium Logo"
              className="w-24 h-16 md:w-48 md:h-32 object-cover rounded-lg shadow-neon border-2 border-pink-400"
            />
            <img
              src="./assets/msec.webp"
              alt="College Logo"
              className="w-24 h-16 md:w-48 md:h-32 object-cover rounded-lg shadow-neon border-2 border-cyan-400"
            />
          </div>

          {/* College Description */}
          <div className="w-full p-6 neon-border-glow rounded-lg shadow-lg backdrop-blur-md">
            <h3 className="text-lg md:text-xl font-semibold text-pink-400 neon-text">Meenakshi Sundararajan Engineering College</h3>
            <SplitText
              text="Meenakshi Sundararajan Engineering College (MSEC), founded by the IIET Society in 2001, is part of the KRS Group of Institutions. Known for quality education and discipline, the KRS Campus also includes IIET (est. 1947), Meenakshi College for Women, and Meenakshi Sundararajan School of Management."
              className="text-sm md:text-lg text-gray-300 text-left"
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </ClickSpark>
  );
};

export default Sympo;

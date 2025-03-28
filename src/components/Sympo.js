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
      <div className="w-full h-screen bg-black text-white flex flex-col items-center py-10 font-mono px-4 overflow-hidden md:overflow-auto">
        <div className="text-xl md:text-2xl font-bold text-cyan-400 neon-text mb-8">
          <h2>ABOUT US</h2>
        </div>

        <div className="w-full md:w-[70%] md:ml-auto flex flex-col space-y-12 md:max-h-none max-h-[70vh] overflow-y-auto scrollbar-hidden">
          {/* Asthra Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start neon-border-glow p-6 rounded-lg shadow-lg backdrop-blur-md">
            <div className="md:w-2/3 text-left order-1 md:order-none">
              <h2 className="text-sm md:text-2xl font-bold text-cyan-400 neon-text mb-4">Asthra2K25</h2>
              <SplitText
                text="Asthra is a national level technical symposium held annually in our college. It is wholly organised and co-ordinated by our students and supported by the management and staff of Information Technology. Asthra is a stepping stone for students to showcase their technical expertise and talent on a grand stage."
                className="text-sm md:text-lg text-gray-300"
                delay={10}
                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.5}
                rootMargin="-50px"
              />
            </div>

            <div className="md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
              <img
                src="./assets/logo.jpeg"
                alt="Symposium Logo"
                className="w-24 h-16 md:w-48 md:h-32 object-cover rounded-lg shadow-neon border-2 border-pink-400"
              />
            </div>
          </div>

          {/* College Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start neon-border-glow p-6 rounded-lg shadow-lg backdrop-blur-md">
            <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
              <img
                src="./assets/msec.webp"
                alt="College Logo"
                className="w-24 h-16 md:w-48 md:h-32 object-cover rounded-lg shadow-neon border-2 border-cyan-400"
              />
            </div>

            <div className="md:w-2/3 text-left">
              <h3 className="text-sm md:text-xl font-semibold text-pink-400 neon-text mb-4">Meenakshi Sundararajan Engineering College</h3>
              <SplitText
                text="Meenakshi Sundararajan Engineering College (MSEC), founded by the IIET Society in 2001, is part of the KRS Group of Institutions. Known for quality education and discipline, the KRS Campus also includes IIET (est. 1947), Meenakshi College for Women, and Meenakshi Sundararajan School of Management."
                className="text-sm md:text-lg text-gray-300"
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

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        .scrollbar-hidden {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .scrollbar-hidden::-webkit-scrollbar { /* WebKit */
          width: 0;
          height: 0;
        }

        @media (max-width: 768px) {
          .overflow-y-auto {
            max-height: 70vh;
          }
        }
      `}</style>
    </ClickSpark>
  );
};

export default Sympo;

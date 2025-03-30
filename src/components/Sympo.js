import React from "react";
import SplitText from "./SplitText";
import ClickSpark from './ClickSpark';

const Sympo = () => {
  return (
    <ClickSpark
      sparkColor='#5A3172'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="w-full h-screen bg-black text-white flex flex-col items-center py-10 font-mono px-4 overflow-hidden md:overflow-auto">
        <div className="text-xl md:text-2xl font-bold text-[#C8A2C8] neon-text mb-8">
          <h2>ABOUT US</h2>
        </div>

        <div className="w-full md:w-[70%] md:ml-auto flex flex-col space-y-12 md:max-h-none max-h-[70vh] overflow-y-auto scrollbar-hidden">
          {/* Asthra Section - Removed background container */}
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 rounded-lg">
            <div className="md:w-2/3 text-left order-1 md:order-none">
              <h2 className="text-sm md:text-2xl font-bold text-[#C8A2C8] neon-text mb-4 font-orbitron">Asthra2K25</h2>
              <SplitText
                text="Asthra is a national level technical symposium held annually in our college. It is wholly organised and co-ordinated by our students and supported by the management and staff of Information Technology. Asthra is a stepping stone for students to showcase their technical expertise and talent on a grand stage."
                className="text-sm md:text-lg text-gray-300 font-orbitron"
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
                className="w-32 h-24 md:w-80 md:h-60 object-cover rounded-lg shadow-neon"
              />
            </div>
          </div>

          {/* College Section - Removed background container */}
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 rounded-lg">
            <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
              <img
                src="./assets/msec.webp"
                alt="College Logo"
                className="w-32 h-24 md:w-80 md:h-60 object-cover rounded-lg shadow-neon"
              />
            </div>

            <div className="md:w-2/3 text-left ml-10">
              <h3 className="text-sm md:text-xl font-semibold text-[#C8A2C8] neon-text mb-4 font-orbitron">Meenakshi Sundararajan Engineering College</h3>
              <SplitText
                text="Meenakshi Sundararajan Engineering College (MSEC), founded by the IIET Society in 2001, is part of the KRS Group of Institutions. Known for quality education and discipline, the KRS Campus also includes IIET (est. 1947), Meenakshi College for Women, and Meenakshi Sundararajan School of Management."
                className="text-sm md:text-lg text-gray-300 font-orbitron"
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
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Orbitron', sans-serif;
        }

        .font-orbitron {
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

        .neon-text {
          text-shadow:
            4px 5px 8px rgba(173, 150, 187, 0.9),
            0px 0px 8px rgba(199, 180, 206, 0.8),
            0px 0px 15px rgba(211, 188, 224, 0.7);
          font-size: 27px;
          line-height: 30px;
          color: rgba(243, 234, 248, 0.91); /* Soft lavender text color for better neon effect */
        }

        .shadow-neon {
          box-shadow:
            0px 5px 8px rgba(242, 238, 244, 0.9),
            0px 0px 9px rgba(255, 255, 255, 0.8);
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

import React, { useState } from "react";

const Photos = ({ logoImage, members = [] }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white py-6">
      
      {/* 🔹 Logo at the Top */}
      <div
        className="w-[140px] h-[140px] rounded-full bg-[#1A1A1D] shadow-[0px_0px_25px_#00FFFF] cursor-pointer flex justify-center items-center overflow-hidden 
        border-4 border-[#00FFFF] transition-all duration-300 hover:shadow-cyan-500 hover:scale-110"
        onClick={toggleSpin}
      >
        <img
          src={currentImage || logoImage}
          alt="Symposium logo"
          className="w-full h-full object-cover rounded-full opacity-90 transition-opacity hover:opacity-100"
        />
      </div>

      {/* 🔹 Title Below Logo */}
      <h2 className="mt-3 text-2xl font-bold text-[#00FFFF] tracking-wider uppercase neon-text">
        Event Coordinators
      </h2>

      {/* 🔹 Team Members in Circular Layout */}
      <div className="relative w-full max-w-3xl h-[230px] flex justify-center items-center mt-4">
        {members.map((member, index) => {
          const angle = (index / members.length) * 2 * Math.PI;
          const x = Math.cos(angle) * 140; // Reduced radius for tighter positioning
          const y = Math.sin(angle) * 70 + 50; // Pulled members closer to the title

          return (
            <div
              key={index}
              className={`absolute flex flex-col items-center transition-all ${isSpinning ? "animate-spin-slow" : ""}`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Member Image */}
              <div
                className="w-[110px] h-[110px] rounded-full bg-[#111] shadow-[0px_0px_15px_#00FFFF] border-2 border-[#00FFFF] 
                  flex justify-center items-center overflow-hidden cursor-pointer transition-all hover:scale-110 hover:shadow-cyan-500"
                onMouseEnter={() => setCurrentImage(member.image)}
                onMouseLeave={() => setCurrentImage(null)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full opacity-80 transition-opacity hover:opacity-100"
                />
              </div>

              {/* Member Name Below */}
              <p className="mt-1 text-[#00FFFF] font-semibold text-sm text-center">{member.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Photos;

import React, { useState } from "react";

const Photos = ({ logoImage, members = [] }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
  };

  const handleMemberClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white py-6">

      {/* 🔹 Logo at the Top */}
      <div
        className="w-[160px] h-[160px] rounded-full bg-[#1A1A1D] shadow-[0px_0px_25px_#00FFFF] cursor-pointer flex justify-center items-center overflow-hidden
        border-4 border-[#00FFFF] transition-all duration-300 hover:shadow-cyan-500 hover:scale-110"
        onClick={toggleSpin}
      >
        <img
          src={currentImage || logoImage}
          alt="Symposium logo"
          className="w-full h-full object-cover rounded-full opacity-90 transition-opacity hover:opacity-100"
        />
      </div>

      {/* 🔹 Space Between Logo and Members */}
      <div className="mt-8"></div>

      {/* 🔹 Team Members in Straight Line Layout */}
      <div className="flex space-x-4 mt-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center transition-all"
          >
            {/* Member Image */}
            <div
              className="w-[130px] h-[130px] rounded-full bg-[#111] shadow-[0px_0px_15px_#00FFFF] border-2 border-[#00FFFF]
                flex justify-center items-center overflow-hidden cursor-pointer transition-all hover:scale-110 hover:shadow-cyan-500"
              onMouseEnter={() => setCurrentImage(member.image)}
              onMouseLeave={() => setCurrentImage(null)}
              onClick={() => handleMemberClick(member.link)}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full opacity-80 transition-opacity hover:opacity-100"
              />
            </div>

            {/* Member Name Below */}
            <h2 className="mt-1 text-[#00FFFF] font-semibold text-center">{member.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;

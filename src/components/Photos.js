import React, { useState } from 'react';

const Photos = ({ logoImage, members }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="relative w-[800px] h-[800px] flex justify-center pt-12">
        <div
          className="absolute w-[200px] h-[200px] rounded-full bg-gray-800 shadow-lg cursor-pointer flex justify-center items-center overflow-hidden z-10 top-20 left-1/2 transform -translate-x-1/2 border-2 border-gray-700 hover:shadow-xl"
          onClick={toggleSpin}
        >
          {currentImage ? (
            <img src={currentImage} alt="Selected member" className="w-full h-full object-cover opacity-80 rounded-full transition-opacity hover:opacity-100" />
          ) : (
            <img src={logoImage} alt="Symposium logo" className="w-full h-full object-cover opacity-80 rounded-full transition-opacity hover:opacity-100" />
          )}
        </div>

        {members.map((member, index) => (
          <div
            key={index}
            className={`absolute w-[120px] h-[120px] rounded-full bg-gray-800 shadow-lg cursor-pointer flex justify-center items-center transition-all z-0 border-2 border-gray-700 overflow-hidden hover:scale-110 hover:shadow-xl ${
              isSpinning ? 'animate-spin-slow' : ''
            }`}
            style={{
              top: '300px',
              left: `calc(50% + ${index * 200 - (members.length - 1) * 100}px)`,
              transform: 'translateX(-50%)',
            }}
            onMouseEnter={() => setCurrentImage(member.image)}
            onMouseLeave={() => setCurrentImage(null)}
          >
            <img src={member.image} alt={member.name} className="w-full h-full object-cover opacity-80 rounded-full transition-opacity hover:opacity-100" />
            <div className="absolute bg-black bg-opacity-90 text-white p-3 rounded-lg text-center opacity-0 transition-opacity backdrop-blur-sm border border-gray-200 hover:opacity-100">
              <h3 className="text-blue-400 mb-1 text-lg">{member.position}</h3>
              <p className="text-gray-300 text-sm">{member.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;

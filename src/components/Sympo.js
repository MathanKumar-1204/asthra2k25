import React from "react";

const Sympo = () => {
  return (
    <div className="w-full bg-black min-h-screen flex flex-col items-center py-10">
      {/* First Section - Symposium Details on the Right */}
      <div className="w-full flex justify-end mr-10">
        <div className="w-2/3 p-6 bg-gray-800 text-white flex flex-col justify-center items-start rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Symposium 2025</h2>
          <p>
            Join us for an exciting event filled with insightful talks, hands-on workshops, and networking opportunities with industry professionals.
          </p>
        </div>
      </div>

      {/* 50px Padding Between Sections */}
      <div className="h-[50px]"></div>

      {/* Second Section - Text Shifted Right with Image on Right */}
      <div className="w-full flex items-center justify-between">
        {/* Left Side - Highlighted Text Container (Shifted Right) */}
        <div className="w-2/3 p-6 ml-8 bg-gray-800 text-white flex flex-col justify-center items-start rounded-lg shadow-lg ">
          <h3 className="text-xl font-semibold">Embracing the Future of Technology</h3>
          <p>
            The Symposium 2025 is a platform where innovation meets opportunity. 
            Join industry leaders, researchers, and students as we delve into the latest advancements in AI, robotics, and emerging technologies. 
            Gain insights, network with professionals, and be part of groundbreaking discussions that shape the future.
          </p>
        </div>

        {/* Right Side - Image with Margin */}
        <div className="w-1/3 flex justify-end pr-16">
          <img
            src="https://via.placeholder.com/300"
            alt="Symposium"
            className="w-80 h-60 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Sympo;
import React from "react";
import SplitText from "./SplitText";

const Sympo = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center py-10 font-mono">
      {/* First Section - Symposium Details */}
      <div className="w-full flex justify-end pr-16">
        <div className="w-2/3 p-6 neon-border-glow text-white flex flex-col justify-center items-start rounded-lg shadow-lg backdrop-blur-md">
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
      </div>

      {/* Space Between Sections */}
      <div className="h-[50px]"></div>

      {/* Second Section - College Description */}
      <div className="w-full flex items-center justify-between">
        {/* Left Side - Text */}
        <div className="w-3/5 p-6 ml-12 neon-border-glow flex flex-col justify-center items-start rounded-lg shadow-lg backdrop-blur-md">
          <h3 className="text-2xl font-semibold text-pink-400 neon-text">
            Meenakshi Sundararajan Engineering College
          </h3>
          <SplitText
            text="Meenakshi Sundararajan Engineering College (MSEC) was established by the IIET Society in 2001. This institution is a part of the prestigious KRS Group of Institutions which also includes the renowned IIET (Indian Institute of Engineering Technology) established in 1947 by our Founder Late Shri K.R.Sundararajan, the well-known Meenakshi College for Women and the more recently established Meenakshi Sundararajan School of Management. The institutions on the KRS Campus are known for the quality education they impart and their stringent levels of discipline. We have consistently outshone all our peers, not only in academics, but in co-curricular activities as well."
            className="text-lg text-gray-300 text-left"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.5}
            rootMargin="-50px"
          />
        </div>

        {/* Right Side - Image */}
        <div className="w-1/3 flex justify-end pr-16">
          <img
            src="https://via.placeholder.com/300"
            alt="Symposium"
            className="w-80 h-60 object-cover rounded-lg shadow-neon border-2 border-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Sympo;

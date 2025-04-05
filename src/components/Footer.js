import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Location from "./Location";

const faqs = [
  { question: "What is the date of the symposium?", answer: "The symposium will be held on April 17th, 2025." },
  { question: "Where is the venue for the symposium?", answer: "The symposium will take place at the Meenakshi Sundararajan Engineering College, Autonomous Institute." },
  { question: "How can I register for the symposium?", answer: "You can register online through our official symposium website." }
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreditsClick = () => {
    navigate('/credits');
  };

  return (
    <div className="w-full bg-[#05050A] text-gray-300 py-16 text-center relative z-10 flex flex-col items-center px-6">

      {/* 🔹 CREDITS Section */}
      <div className="max-w-3xl w-full mt-10">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-[#00FFFF] tracking-wide">
          CREDITS
        </h2>
        <button
          className="bg-[#00FFFF] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#0B0B13] hover:text-[#00FFFF] transition-all duration-300"
          onClick={handleCreditsClick}
        >
          View Our Team
        </button>
      </div>

      {/* 🔹 FAQ Section */}
      <div className="max-w-3xl w-full mt-10">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-[#00FFFF] tracking-wide">
          FAQs
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-[#009999] rounded-2xl bg-[#10101A] hover:bg-[#009999] transition-colors duration-200"
            >
              <button
                className="w-full p-6 text-left font-semibold bg-[#0B0B13] hover:bg-[#009999] text-white flex justify-between items-center transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform duration-300 text-xl ${
                    openIndex === index ? "rotate-180 text-black" : "rotate-0 text-[#009999]"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-60 p-6 bg-[#0B0B13] text-[#009999] border-t border-[#009999]"
                    : "max-h-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Flip Cards Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Event Date", "100 % free!", "Win Prizes"].map((title, index) => (
          <div key={index} className="flip-container">
            <div className="flip-card">
              {/* Front Side */}
              <div className="flip-card-front">
                <h3 className="text-2xl font-semibold text-[#00FFFF]">{title}</h3>
              </div>
              {/* Back Side */}
              <div className="flip-card-back">
                <p className="text-[#FF00FF] text-lg">
                  {index === 0
                    ? "The symposium is scheduled for April 17th, 2025."
                    : index === 1
                    ? "Free registration for all events."
                    : "Every tech event has a prize pool for top 3 winners. "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Flip Card Styles */}
      <style>
        {`
          .flip-container {
            perspective: 1000px;
            width: 250px;
            height: 150px;
          }

          .flip-card {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
          }

          .flip-container:hover .flip-card {
            transform: rotateY(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
          }

          .flip-card-front {
            background: #05050A; /* Cyberpunk Dark */
            color: #00FFFF;
            border: 2px solid #00FFFF;
          }

          .flip-card-back {
            background: #0B0B13;
            color: #FF00FF;
            transform: rotateY(180deg);
            border: 2px solid #FF00FF;
          }
        `}
      </style>

      {/* 🔹 Inner Div for Location and Social Links */}
      <div className="w-full flex flex-col items-center mt-16">
        <Location />

        {/* 🔹 Footer Text */}
       

        {/* 🔹 Footer Layout */}
        <div className="w-full flex flex-col md:flex-row justify-between mt-10 px-6">
          {/* Left Side: Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-[#00FFFF] mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/asthra.2k25" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00FFFF] text-lg transition-colors duration-300 flex items-center">
                <FaInstagram className="text-[#FF00FF] text-2xl mr-2 hover:scale-105 transition-transform duration-300 hover:text-[#00FFFF]" />
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/asthra-it-367b6b359" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00FFFF] text-lg transition-colors duration-300 flex items-center">
                <FaLinkedin className="text-[#FF00FF] text-2xl mr-2 hover:scale-105 transition-transform duration-300 hover:text-[#00FFFF]" />
                LinkedIn
              </a>
              <a href="mailto:msecasthra2k25@gmail.com" className="text-gray-300 hover:text-[#00FFFF] text-lg transition-colors duration-300 flex items-center">
                <FaEnvelope className="text-[#FF00FF] text-2xl mr-2 hover:scale-105 transition-transform duration-300 hover:text-[#00FFFF]" />
                Email
              </a>
            </div>
          </div>

          {/* Right Side: Contact Us */}
          <div className="flex flex-col items-start mt-8 md:mt-0">
            <h3 className="text-2xl font-semibold text-[#00FFFF] mb-4">Contact Us</h3>
            <p className="text-lg text-gray-300">Nandha Kumar: +91 7708 159 052</p>
            <p className="text-lg text-gray-300">Venkatesh: +91 7708 624 152</p>
            <p className="text-lg text-gray-300 mt-4"> Meenakshi Sundararajan Engineering College, Autonomous Institute,</p>
            <p className="text-lg text-gray-300 "> #363, Arcot Road, Kodambakkam, Chennai-600 024.</p>
          </div>
        </div>
      </div>
      <p className="text-xl font-semibold tracking-wide text-[#00FFFF] mt-8">
          &copy; 2025 ASTHRA. All rights reserved.
        </p>
    </div>
  );
};

export default Footer;

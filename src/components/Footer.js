import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import Location from "./Location";

const faqs = [
  { question: "What is the date of the symposium?", answer: "The symposium will be held on April 12th, 2025." },
  { question: "Where is the venue for the symposium?", answer: "The symposium will take place at the Meenakshi Sundararajan Engineering College, Autonomous Institute." },
  { question: "How can I register for the symposium?", answer: "You can register online through our official symposium website." }
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#05050A] text-gray-300 py-16 text-center relative z-10 flex flex-col items-center px-6 border-t-2 border-[#00FFFF] shadow-[0_0_30px_#00FFFF]">
      
      {/* 🔹 FAQ Section */}
      <div className="max-w-3xl w-full mt-10">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-[#00FFFF] tracking-wide neon-text">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-2 border-[#00FFFF] rounded-2xl bg-[#10101A] hover:shadow-[0_0_20px_#00FFFF] transition-all duration-300">
              <button
                className="w-full p-6 text-left font-semibold bg-[#0B0B13] hover:bg-[#00FFFF] text-white flex justify-between items-center transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl">{faq.question}</span>
                <ChevronDown className={`transition-transform duration-300 text-xl ${openIndex === index ? "rotate-180 text-black" : "rotate-0 text-[#00FFFF]"}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-60 p-6 bg-[#0B0B13] text-[#00FFFF] border-t border-[#00FFFF]" : "max-h-0"}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Flip Cards Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Event Details", "Keynote Speakers", "Workshops"].map((title, index) => (
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
                    ? "The symposium is scheduled for April 12th, 2025."
                    : index === 1
                    ? "Eminent speakers from industry and academia will be present."
                    : "Hands-on workshops covering AI, Blockchain, and more."}
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
            box-shadow: 0 4px 15px rgba(0,255,255,0.5);
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

      {/* 🔹 Location Component */}
      <div className="w-full flex justify-center mt-16">
        <Location />
      </div>

      {/* 🔹 Footer Text */}
      <p className="text-xl font-semibold tracking-wide text-[#00FFFF]">&copy; 2025 ASTHRA. All rights reserved.</p>

      {/* 🔹 Instagram Link */}
      <div className="flex items-center mt-6 space-x-3">
        <FaInstagram className="text-[#FF00FF] text-4xl hover:scale-110 transition-transform duration-300 hover:text-[#00FFFF]" />
        <a href="https://instagram.com/asthra2k25" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00FFFF] text-lg transition-colors duration-300 neon-text">
          @asthra2k25
        </a>
      </div>
    </div>
  );
};

export default Footer;

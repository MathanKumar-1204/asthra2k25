import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

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
    <div className="w-full bg-black text-gray-300 py-16 text-center mt-40 relative z-10 flex flex-col items-center px-6">
      

      {/* FAQ Section */}
      <div className="max-w-3xl w-full mt-16">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-white tracking-wide">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-2xl shadow-2xl overflow-hidden bg-gray-800 transition-all duration-300 hover:shadow-3xl">
              <button
                className="w-full p-6 text-left font-semibold bg-gray-700 hover:bg-gray-600 flex justify-between items-center text-white focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl">{faq.question}</span>
                <ChevronDown className={`transition-transform duration-300 text-xl ${openIndex === index ? "rotate-180" : "rotate-0"}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-60 p-6 bg-gray-900 text-gray-200 border-t border-gray-600" : "max-h-0"}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flip Cards Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Event Details", "Keynote Speakers", "Workshops"].map((title, index) => (
          <div key={index} className="flip-container">
            <div className="flip-card">
              {/* Front Side */}
              <div className="flip-card-front">
                <h3 className="text-2xl font-semibold">{title}</h3>
              </div>
              {/* Back Side */}
              <div className="flip-card-back">
                <p>
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

      {/* Styles for Flip Cards */}
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
            padding: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .flip-card-front {
            background: #374151; /* Gray */
            color: white;
          }

          .flip-card-back {
            background: #1f2937; /* Darker Gray */
            color: white;
            transform: rotateY(180deg);
          }
        `}
      </style>
      <p className="text-xl font-semibold tracking-wide">&copy; 2025 ASTHRA. All rights reserved.</p>
      <div className="flex items-center mt-6 space-x-3">
        <FaInstagram className="text-pink-500 text-4xl hover:scale-110 transition-transform duration-300" />
        <a href="https://instagram.com/asthra2k25" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-lg transition-colors duration-300">@asthra2k25</a>
      </div>
    </div>
  );
};

export default Footer;
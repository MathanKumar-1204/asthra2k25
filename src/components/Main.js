import React, { useState, useEffect } from "react";
import CubeAnimation from "./CubeAnimation";
import Front from "./Front";
import Sympo from "./Sympo";
import Events from "./Events";
import Sponsors from "./Sponsors";
import Members from "./Members";
import Footer from "./Footer";
import ClickSpark from './ClickSpark';


const Main = () => {
  console.log("Rendering Main component");

  const [currentSection, setCurrentSection] = useState("sympo");
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Simulate a loading process
    const load = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulate a 2-second load time
    };

    load();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < 1000) {
        setCurrentSection("sympo");
      } else if (scrollPosition >= 1000 && scrollPosition < 2000) {
        setCurrentSection("events");
      } else if (scrollPosition >= 2000 && scrollPosition < 3000) {
        setCurrentSection("sponsors");
      } else {
        setCurrentSection(null); // Hide the cube for other sections
      }
      console.log("Current Section:", currentSection);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSection]); // Include currentSection in the dependency array

  if (isLoading) {
    return (
      
      <div className="flex items-center justify-center w-full min-h-screen bg-black  ">
        <div className="terminal-loader relative overflow-hidden bg-black text-green-500 font-mono text-base p-4 w-32 shadow-lg rounded-md border border-gray-700 box-border">
          <div className="terminal-header absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-md p-1 box-border">
            <div className="terminal-title float-left text-gray-300 leading-6">Status</div>
            <div className="terminal-controls float-right">
              <div className="control close inline-block w-1.5 h-1.5 ml-1 bg-red-600 rounded-full"></div>
              <div className="control minimize inline-block w-1.5 h-1.5 ml-1 bg-yellow-500 rounded-full"></div>
              <div className="control maximize inline-block w-1.5 h-1.5 ml-1 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="text inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 mt-6 animate-typeAndDelete">
            Loading...
          </div>
          <style jsx>{`
            @keyframes blinkCursor {
              50% {
                border-right-color: transparent;
              }
            }

            @keyframes typeAndDelete {
              0%,
              10% {
                width: 0;
              }
              45%,
              55% {
                width: 6.2em; /* adjust width based on content */
              }
              90%,
              100% {
                width: 0;
              }
            }

            .animate-typeAndDelete {
              animation: typeAndDelete 4s steps(11) infinite, blinkCursor 0.5s step-end infinite alternate;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    
    <div className="relative w-full bg-black flex flex-col overflow-x-hidden">
      <div className="top-0 sticky z-10">
        <Front />
      </div>
      {console.log("rendering cube, current section:", currentSection)}
      {(currentSection === "sympo" ||
        currentSection === "events" ||
        currentSection === "sponsors") &&
        windowWidth >= 768 && ( // Adjust the threshold as needed
          <CubeAnimation className="absolute left-0" currentSection={currentSection} />
        )}
      <div className="top-0 w-full sticky bg-black z-10">
        <Sympo />
      </div>
      <div id="events" className="top-0 bg-black z-10 p-3">
        <Events />
      </div>
      <div className="top-0 w-full sticky bg-black z-10 p-3">
        <Sponsors />
      </div>
      <div className="top-0  w-full sticky z-10 bg-black p-3">
        <Members />
      </div>
      <div className="top-0 w-full sticky bg-black z-10 p-3">
        <Footer />
      </div>
    </div>
  );
};

export default Main;

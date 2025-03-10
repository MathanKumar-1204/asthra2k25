import React, { useState, useEffect } from "react";
import CubeAnimation from "./CubeAnimation";
import Front from "./Front";
import Sympo from "./Sympo";
import Events from "./Events";
import Sponsors from "./Sponsors";
import Registered from "./Registered";
import Members from "./Members";
import Footer from "./Footer";

const Main = () => {
  console.log("Rendering Main component");

  const [currentSection, setCurrentSection] = useState("sympo");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < 2000) {
        setCurrentSection("sympo");
      } else if (scrollPosition >= 500 && scrollPosition < 2500) {
        setCurrentSection("events");
      } else if (scrollPosition >= 1000 && scrollPosition < 3500) {
        setCurrentSection("sponsors");
      } else {
        setCurrentSection(null); // Hide the cube for other sections
      }
      console.log("Current Section:", currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  return (
    <>
      <div className="relative bg-black flex flex-col ">
        <div className="top-0 sticky z-10 ">
          <Front />
        </div>
        {console.log("rendering cube, current section:", currentSection)}
        {currentSection === "sympo" ||
        currentSection === "events" ||
        currentSection === "sponsors" ? (
          <CubeAnimation className="absolute left-0" currentSection={currentSection} />
        ) : null}
        <div className="top-0 sticky bg-white z-10 ">
          <Sympo />
        </div>
        <div id="events" className="top-0  bg-white z-10 p-3">
          <Events />
        </div>
        <div className="top-0 sticky bg-white z-10 p-3">
          <Sponsors />
        </div>
        <div className="top-0 sticky z-10 bg-white p-3">
          <Registered />
        </div>
        <div className="top-0 sticky z-10 bg-white p-3">
          <Members />
        </div>
        <div className="top-0 sticky bg-white z-10 p-3">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Main;

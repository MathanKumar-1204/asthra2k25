import React, { useRef, useEffect } from 'react';
import './ImageSlider.css';
import WebDevelopmentTeam from './WebDevelopmentTeam';
import StudentCoordinators from './StudentCoordinators'; // Import the new component
import Sec from './sec';
import Poster from './Posterteam';
import Edit from './Edit';

const handleOpenLinkedIn = (url) => {
  window.open(url, "_blank");
};

const Avatars = () => {
  const topRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerStyle = "relative bg-gray-900/50 rounded-lg p-6 mb-12 shadow-xl border border-purple-700";
  const titleStyle = "text-3xl font-bold text-white mb-8 text-center";
  const webTitleStyle = "text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 mt-6 md:mt-10 text-center";
  const nameStyle = "text-xl font-bold text-white mt-2 text-center tracking-wide";

  return (
    <div className="pb-12 px-4" ref={topRef}>
      <button
        className="back-button bg-purple-700 text-white px-4 py-2 rounded mt-4"
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <h1 className={webTitleStyle} style={{ color: '#00FFFF' }}>CREDITS</h1>

      <h3 className={webTitleStyle}>Web Development Team</h3>
      <WebDevelopmentTeam />

      <StudentCoordinators />

      <Poster/>

     <Edit/>
      <Sec className="bg-blue "/>
    </div>
  );
};

export default Avatars;

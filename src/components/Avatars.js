import React, { useRef, useEffect } from 'react';
import './ImageSlider.css';
import CircularGallery from './CircularGallery';
import WebDevelopmentTeam from './WebDevelopmentTeam';
import StudentCoordinators from './StudentCoordinators'; // Import the new component
import Sec from './sec';
const posterteam = [
  { src: "./assets/avatars/posterteam/Sanjana.jpg", name: "Sanjana", link: "https://www.linkedin.com/in/sanjana-a-9178162a1" },
  { src: "./assets/avatars/posterteam/Siva.jpg", name: "Sivabalaji", link: "https://www.linkedin.com/in/sivabalaji-g-069989257" },
  { src: "./assets/avatars/social/Tharani.jpg", name: "Tharani", link: "https://www.linkedin.com/in/tharani-ganesh-6b8b2b2a1" },
  { src: "./assets/avatars/posterteam/Bindusri.png", name: "Bindusri", link: "https://www.linkedin.com/in/bindusri-v-k-8bb2732a2" },
  { src: "./assets/avatars/posterteam/Nisha.jpg", name: "Nisha", link: "https://www.linkedin.com/in/nisha-d-j-924b082a1" },
  { src: "./assets/avatars/posterteam/HariniKarpagam.jpeg", name: "Harini Karpagam", link: "https://www.linkedin.com/in/lingeswar-m" },
  { src: "./assets/avatars/posterteam/Lingesh.jpg", name: "Lingeshwaran", link: "https://www.linkedin.com/in/lingeswar-m" },
];

const mediaTeam = [
  { src: "./assets/avatars/videoteam/dharun.jpg", link: "https://www.linkedin.com/in/dharun-kumar-80a9102a1/", name: "Dharun Kumar" },
  { src: "./assets/avatars/videoteam/pooja.png", link: "https://www.linkedin.com/in/pooja-sri-b9421b2a2/", name: "Poojasri" },
  { src: "./assets/avatars/videoteam/Manoj.png", link: "https://www.linkedin.com/in/manoj0512", name: "Manoj" },
  { src: "./assets/avatars/social/jasnaa.jpg", link: "https://www.linkedin.com/in/jasna-shaji-1a3b932a1", name: "Jasna Shaji" }
];

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

      <h3 className={webTitleStyle}>Web Development Team</h3>
      <WebDevelopmentTeam />

      <h3 className={titleStyle}>Student Coordinators</h3>
      <StudentCoordinators />

      <h3 className={titleStyle}>Poster Team</h3>
      <div className={containerStyle}>
        <div className="h-[500px] md:h-[600px]">
          <CircularGallery
            items={posterteam.map(item => ({
              image: item.src,
              text: item.name,
              linkedIn: item.link,
              textClassName: nameStyle
            }))}
            bend={-3}
            textColor="#ffffff"
            borderRadius={0.05}
            border="2px solid #4a2c91"
            onImageClick={(item) => handleOpenLinkedIn(item.linkedIn)}
          />
        </div>
      </div>

      <h3 className={titleStyle}>Editing & Social Media Team</h3>
      <div className={containerStyle}>
        <div className="h-[500px] md:h-[600px]">
          <CircularGallery
            items={mediaTeam.map(item => ({
              image: item.src,
              text: item.name,
              linkedIn: item.link,
              textClassName: nameStyle
            }))}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            border="2px solid #4a2c91"
            onImageClick={(item) => handleOpenLinkedIn(item.linkedIn)}
          />
        </div>

      </div>
      <Sec className="bg-blue "/>
    </div>
  );
};

export default Avatars;

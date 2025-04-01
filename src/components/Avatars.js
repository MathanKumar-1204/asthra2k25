import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageSlider.css';
import CircularGallery from './CircularGallery';

const images = [
  { src: "./assets/avatars/web/Mathan.png", link: "https://www.linkedin.com/in/mathankumarg04/", name: "Mathan Kumar" },
  { src: "./assets/avatars/web/Prathana.png", link: "https://www.linkedin.com/in/prathana2004", name: "Prathana" },
  { src: "./assets/avatars/web/Pavithra.jpg", link: "https://www.linkedin.com/in/pavithra-ganapathy", name: "Pavithra" },
  { src: "./assets/avatars/web/Hemasri.jpeg", link: "https://www.linkedin.com/in/hemasri-rajasekaran-2b78152a1", name: "Hemasri" },
  { src: "./assets/avatars/web/Ajith.jpeg", link: "https://www.linkedin.com/in/ajith-raghavendra-106247290/", name: "Ajith" },
  { src: "./assets/avatars/web/Ramalakshmi.jpeg", link: "https://www.linkedin.com/in/ramalakshmi-muthuraman-197b732a1", name: "Ramalakshmi" },
  { src: "./assets/avatars/web/mohanakumar.jpg", link: "https://www.linkedin.com/in/mohanakumar-k-7a0b712a1/", name: "Mohana Kumar" },
  { src: "./assets/avatars/web/Zainab.jpg", link: "https://www.linkedin.com/in/zainab-nisa-32b87b275", name: "Zainab Nisa" },
];

const studcoord = [
  { src: "/assets/avatars/videoteam/pooja.png", name: "Poojasri", link: "https://www.linkedin.com/in/pooja-sri-b9421b2a2/" },
  { src: "./assets/avatars/studcoord/Reena.jpg", name: "Reena", link: "www.linkedin.com/in/reena-venkatesh-6a036a1ab" },
  { src: "./assets/avatars/studcoord/Zainab.jpg", name: "Zainab Nisa", link: "https://www.linkedin.com/in/zainab-nisa-32b87b275" },
  { src: "./assets/avatars/studcoord/Lingesh.jpg", name: "Lingeshwaran", link: "https://www.linkedin.com/in/lingeswar-m" },
  { src: "./assets/avatars/studcoord/Hemanth.jpeg", name: "Hemanth", link: "https://www.linkedin.com/in/hemanth-ayyappan-6b0b062a1/" },
  { src: "./assets/avatars/studcoord/Siva.jpg", name: "Sivabalaji", linke: "https://www.linkedin.com/in/sivabalaji-g-069989257" },
];

const posterteam = [
  { src: "./assets/avatars/posterteam/Sanjana.jpg", name: "Sanjana", link: "https://www.linkedin.com/in/sanjana-a-9178162a1" },
  { src: "./assets/avatars/posterteam/Siva.jpg", name: "Sivabalaji", link: "https://www.linkedin.com/in/sivabalaji-g-069989257" },
  { src: "./assets/avatars/social/Tharani.jpg", name: "Tharani", link: "https://www.linkedin.com/in/tharani-ganesh-6b8b2b2a1" },
  { src: "./assets/avatars/posterteam/Nisha.jpg", name: "Nisha", link: "https://www.linkedin.com/in/nisha-d-j-924b082a1" },
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
  const webSliderRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createSliderHandlers = (sliderRef) => {
    const handleMouseEnter = (index) => {
      const items = sliderRef.current.querySelectorAll('.item');
      gsap.to(items[index], { rotationY: 0, duration: 0.5 });
    };

    const handleMouseLeave = (index) => {
      const items = sliderRef.current.querySelectorAll('.item');
      gsap.to(items[index], { rotationY: 36, duration: 0.5 });
    };

    return { handleMouseEnter, handleMouseLeave };
  };

  const webHandlers = createSliderHandlers(webSliderRef);

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  const containerStyle = "relative bg-gray-900/50 rounded-lg p-6 mb-12 shadow-xl border border-purple-700";
  const webContainerStyle = "relative mb-12 md:-mt-20";
  const titleStyle = "text-3xl font-bold text-white mb-8 text-center";
  const webTitleStyle = "text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 mt-6 md:mt-10 text-center";
  const nameStyle = "text-xl font-bold text-white mt-2 text-center tracking-wide";

  const renderSlider = (items, sliderRef, handlers) => (
    <div
      className="slider-container grid grid-cols-2 gap-4 md:block"
      ref={sliderRef}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="item-wrapper text-center"
          onMouseEnter={() => handlers.handleMouseEnter(index)}
          onMouseLeave={() => handlers.handleMouseLeave(index)}
          onClick={() => handleClick(item.link)}
        >
          <div
            className="item relative w-full h-64 bg-cover bg-center rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            style={{ backgroundImage: `url(${item.src})` }}
          ></div>
          <div className={nameStyle}>{item.name}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pb-12 px-4" ref={topRef}>
      <button
        className="back-button bg-purple-700 text-white px-4 py-2 rounded mt-4"
        onClick={() => window.history.back()}
      >
        Back
      </button>

      <h3 className={webTitleStyle}>Web Development Team</h3>
      <div className={webContainerStyle}>
        {renderSlider(images, webSliderRef, webHandlers)}
      </div>

      <h3 className={titleStyle}>Student Coordinators</h3>
      <div className={containerStyle}>
        <div className="h-[500px] md:h-[600px]">
          <CircularGallery
            items={studcoord.map(item => ({
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
    </div>
  );
};

export default Avatars;

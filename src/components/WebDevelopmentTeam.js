import React, { useRef } from 'react';
import { gsap } from 'gsap';

const WebDevelopmentTeam = () => {
  const webSliderRef = useRef(null);

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
    <div className="relative mb-12 md:-mt-20">
      {renderSlider(images, webSliderRef, webHandlers)}
    </div>
  );
};

export default WebDevelopmentTeam;

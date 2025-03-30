// src/components/ImageSlider.js
import React, { useRef , useState} from 'react';
import { gsap } from 'gsap';
import './ImageSlider.css'; // Import the CSS file for styling
import CircularGallery from './CircularGallery';
import Photos from './Photos';
// import Lanyard from './lanyard'
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
  { image: "./assets/avatars/studcoord/Zainab.jpg", text: "Poojasri", linkedIn: "https://www.linkedin.com/in/jameseditor/" },
  { image: "./assets/avatars/studcoord/Reena.jpg", text: "Reena", linkedIn: "https://www.linkedin.com/in/sophievideo/" },
  { image: "./assets/avatars/studcoord/Zainab.jpg", text: "Zainab Nisa", linkedIn: "https://www.linkedin.com/in/zainab-nisa-32b87b275" },
  { image: "./assets/avatars/studcoord/Zainab.jpg", text: "Lingeshwaran", linkedIn: "https://www.linkedin.com/in/oliviamotion/" },
  { image: "./assets/avatars/studcoord/Zainab.jpg", text: "Hemanth", linkedIn: "https://www.linkedin.com/in/danielaudio/" },
  { image: "./assets/avatars/studcoord/Zainab.jpg", text: "Siva Balaji", linkedIn: "https://www.linkedin.com/in/emmaeffects/" },
];
const posterteam = [
  { image: "./assets/avatars/posterteam/Sanjana.jpg", text: "Sanjana", linkedIn: "https://www.linkedin.com/in/jameseditor/" },
  { image: "./assets/avatars/posterteam/Zainab.jpg", text: "Sivabalaji", linkedIn: "https://www.linkedin.com/in/danielaudio/" },
  { image: "./assets/avatars/posterteam/Zainab.jpg", text: "Tharani", linkedIn: "https://www.linkedin.com/in/sophievideo/" },
  { image: "./assets/avatars/posterteam/Nisha.jpg", text: "Nisha", linkedIn: "https://www.linkedin.com/in/alexgraphics/" },
  { image: "./assets/avatars/posterteam/Zainab.jpg", text: "Lingeshwaran", linkedIn: "https://www.linkedin.com/in/oliviamotion/" },
];
const videoteam = [
  { image: "./assets/avatars/videoteam/Sanjana.jpg", name: "Dharun Kumar", link: "https://www.linkedin.com/in/jameseditor/" },
  { image: "./assets/avatars/videoteam/Zainab.jpg", name: "Poojasri", link: "https://www.linkedin.com/in/danielaudio/" },
  { image: "./assets/avatars/videoteam/Zainab.jpg", name: "Manoj", link: "https://www.linkedin.com/in/sophievideo/" },
];
const social= [
  { image: "./assets/avatars/social/Sanjana.jpg", name: "Dharun Kumar", link: "https://www.linkedin.com/in/jameseditor/" },
  { image: "./assets/avatars/social/Zainab.jpg", name: "Jasna Shaji", link: "https://www.linkedin.com/in/danielaudio/" },

];
const handleOpenLinkedIn = (url) => {
 
  window.open(url, "_blank");
  
  // Hide notification after 3 seconds
 
};
const Avatars = () => {
  const sliderRef = useRef(null);


  const handleMouseEnter = (index) => {
    const items = sliderRef.current.querySelectorAll('.item');
    gsap.to(items[index], { rotationY: 0, duration: 0.5 });
  };

  const handleMouseLeave = (index) => {
    const items = sliderRef.current.querySelectorAll('.item');
    gsap.to(items[index], { rotationY: 36, duration: 0.5 });
  };

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      <div className="slider-title">Web Development Team</div>
      <div className="slider-container" ref={sliderRef}>
        {images.map((image, index) => (
          <div
            key={index}
            className="item-wrapper text-center"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleClick(image.link)}
          >
            <div
              className="item relative w-full h-64 bg-cover bg-center rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
              style={{ backgroundImage: `url(${image.src})` }}
            ></div>
            <div className="item-name mt-2 text-white text-lg">{image.name}</div>
          </div>
        ))}
      </div>
      <div className="relative z-10 text-center mb-10">
              <h3 className="inline-block text-2xl md:text-3xl font-bold text-white px-8 py-3 rounded-full 
                             bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg border border-purple-700 animate-float">
               Student coordinators
              </h3>
            </div>
            <div className="h-[500px] md:h-[600px] relative border-2 border-purple-900 rounded-lg">
              <CircularGallery 
                items={studcoord} 
                bend={3} 
                textColor="#ffffff" 
                borderRadius={0.05}
                font="bold 24px sans-serif"
                border="2px solid #4a2c91"
                onImageClick={(item) => handleOpenLinkedIn( item.linkedIn)}
              />
          </div>
          <div className="relative z-10 text-center mb-10">
              <h3 className="inline-block text-2xl md:text-3xl font-bold text-white px-8 py-3 rounded-full 
                             bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg border border-purple-700 animate-float">
                Poster Team
              </h3>
            </div>
            <div className="h-[500px] md:h-[600px] relative border-2 border-purple-900 rounded-lg">
              <CircularGallery 
                items={posterteam} 
                bend={-3} 
                textColor="#ffffff" 
                borderRadius={0.05}
                font="bold 24px sans-serif"
                border="2px solid #4a2c91"
                onImageClick={(item) => handleOpenLinkedIn(item.text, item.linkedIn)}
              />
          </div>
          <div className="relative z-10 text-center mb-10">
              <h3 className="inline-block text-2xl md:text-3xl font-bold text-white px-8 py-3 rounded-full 
                             bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg border border-purple-700 animate-float">
                Editing Team
              </h3>
            </div>
            <div className="h-[500px] md:h-[600px] relative border-2 border-purple-900 rounded-lg">
              <Photos logoImage = "./assets/Camera.jfif"  members={videoteam}  />
          </div>
          <div className="relative z-10 text-center mb-10">
              <h3 className="inline-block text-2xl md:text-3xl font-bold text-white px-8 py-3 rounded-full 
                             bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg border border-purple-700 animate-float">
                Social Media Team
              </h3>
            </div>
            <div className="h-[500px] md:h-[600px] relative border-2 border-purple-900 rounded-lg">
              <Photos logoImage = "./assets/Camera.jfif"  members={social}  />
          </div>
         

{/* <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} /> */}
      </div> 
    
  );
};

export default Avatars;

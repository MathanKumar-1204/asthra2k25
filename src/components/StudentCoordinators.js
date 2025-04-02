import React from 'react';
import CircularGallery from './CircularGallery';

const StudentCoordinators = () => {
  const studcoord = [
    { src: "/assets/avatars/videoteam/pooja.png", name: "Poojasri", link: "https://www.linkedin.com/in/pooja-sri-b9421b2a2/" },
    { src: "./assets/avatars/studcoord/Reena.jpg", name: "Reena", link: "https://www.linkedin.com/in/reena-venkatesh-6a036a1ab" },
    { src: "./assets/avatars/studcoord/Zainab.jpg", name: "Zainab Nisa", link: "https://www.linkedin.com/in/zainab-nisa-32b87b275" },
    { src: "./assets/avatars/studcoord/Lingesh.jpg", name: "Lingeshwaran", link: "https://www.linkedin.com/in/lingeswar-m" },
    { src: "./assets/avatars/studcoord/Hemanth.jpeg", name: "Hemanth", link: "https://www.linkedin.com/in/hemanth-ayyappan-6b0b062a1/" },
    { src: "./assets/avatars/studcoord/Siva.jpg", name: "Sivabalaji", link: "https://www.linkedin.com/in/sivabalaji-g-069989257" },
  ];

  const handleOpenLinkedIn = (url) => {
    window.open(url, "_blank");
  };

  const nameStyle = "text-xl font-bold text-white mt-2 text-center tracking-wide";

  return (
    <div className="relative bg-gray-900/50 rounded-lg p-6 mb-12 shadow-xl border border-purple-700">
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
  );
};

export default StudentCoordinators;

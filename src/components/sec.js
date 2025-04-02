import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TeamMember = ({ name, link, imageSrc }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col items-center m-4 bg-gray-900/50 p-4 rounded-lg shadow-lg border border-purple-700 w-full max-w-xs">
        <img
          src={imageSrc}
          alt={name}
          className="w-64 h-80 object-cover rounded-lg cursor-pointer border-4 border-purple-700"
        />
        <p className="mt-4 text-center text-white font-bold text-lg">{name}</p>
      </div>
    </a>
  );
};

const TeamSection = ({ title, teamMembers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto p-6 bg-gray-900/50 rounded-lg shadow-xl border border-purple-700 max-w-screen-2xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">{title}</h1>
      <Slider {...settings} className="w-full px-6">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            link={member.link}
            imageSrc={member.imageSrc}
          />
        ))}
      </Slider>
    </div>
  );
};

const Sec = () => {
  const teamMembers = [
    { name: 'Ananthavalli', link: '#', imageSrc: './assets/avatars/2ndyr/Ananthavalli.jpg' },
    { name: 'Deshma', link: '#', imageSrc: './assets/avatars/2ndyr/Deshma.jpeg' },
    { name: 'Dharun Kumar', link: '#', imageSrc: './assets/avatars/2ndyr/Dharun Kumar.png' },
    { name: 'Gayathri TP', link: '#', imageSrc: './assets/avatars/2ndyr/Gayathri TP.webp' },
    { name: 'Gayathri V', link: '#', imageSrc: './assets/avatars/2ndyr/Gayathri V.jpg' },
    { name: 'Lokesh', link: '#', imageSrc: './assets/avatars/2ndyr/Lokesh.jpg' },
    { name: 'Nihil', link: '#', imageSrc: './assets/avatars/2ndyr/Nihil M.png' },
    { name: 'Shreya', link: '#', imageSrc: './assets/avatars/2ndyr/Shreya.webp' },
    { name: 'Thithiksha', link: '#', imageSrc: './assets/avatars/2ndyr/Thithiksha.jpeg' },
  ];

  return <TeamSection title="Poster Team" teamMembers={teamMembers} />;
};

export default Sec;
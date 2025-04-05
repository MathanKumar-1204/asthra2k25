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
    { name: 'Ananthavalli', link: 'https://www.linkedin.com/in/ananthavalli-m-aa29512a2', imageSrc: './assets/avatars/2ndyr/Ananthavalli.jpg' },
    { name: 'Deshma', link: 'https://www.linkedin.com/in/deshma-u-4453722a2/', imageSrc: './assets/avatars/2ndyr/Deshma.jpeg' },
    { name: 'Dharun Kumar', link: 'https://www.linkedin.com/in/dharun-kumar-s-h-0362702a2/', imageSrc: './assets/avatars/2ndyr/Dharun Kumar.png' },
    { name: 'Gayathri TP', link: 'https://www.linkedin.com/in/gayathri-tp-136a042a2', imageSrc: './assets/avatars/2ndyr/Gayathri TP.webp' },
    { name: 'Gayathri V', link: 'https://www.linkedin.com/in/gayathri-venkatesan-2b39a72a1', imageSrc: './assets/avatars/2ndyr/Gayathri V.jpg' },
    { name: 'Lokesh', link: 'https://www.linkedin.com/in/lokesh-y-6ba15628a/', imageSrc: './assets/avatars/2ndyr/Lokesh.jpg' },
    { name: 'Nihil', link: ' https://www.linkedin.com/in/nihil-m-287074289/', imageSrc: './assets/avatars/2ndyr/Nihil M.png' },
    { name: 'Shreya', link: 'https://www.linkedin.com/in/shreya-sonpavane-2b2b152a1/', imageSrc: './assets/avatars/2ndyr/Shreya.webp' },
    { name: 'Thithiksha', link: 'https://www.linkedin.com/in/thithiksha-mv-16b2162a3', imageSrc: './assets/avatars/2ndyr/Thithiksha.jpeg' },
    { name: 'Harinishree', link: 'https://www.linkedin.com/in/harinishree-s-457b162a1', imageSrc: './assets/avatars/2ndyr/Harinishree.png' },
    { name: 'Prisha', link: 'https://www.linkedin.com/in/prisha-s-9852662a2', imageSrc: './assets/avatars/2ndyr/Prisha.jpeg' },
    { name: 'Divya Priya', link: 'https://www.linkedin.com/in/prisha-s-9852662a2', imageSrc: './assets/avatars/2ndyr/Divya.jpeg' },
  ];

  return <TeamSection title="Poster Team" teamMembers={teamMembers} />;
};

export default Sec;
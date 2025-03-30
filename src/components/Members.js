import InfiniteMenu from './InfiniteMenu'
import TextPressure from './Text';
import TrueFocus from './TrueFocus';

const Members = () => {
  const items = [
    {
      image: './assets/avatars/organisers/Nandha.jpeg',
      link: 'https://google.com/',
      title: 'Nandha Kumar',
      description: 'President (SWIPE ->)'
    },
    {
      image: './assets/avatars/organisers/Venkat.png',
      link: 'https://www.linkedin.com/in/venkatesh-c6296/',
      title: 'Venkatesh',
      description: 'Vice President'
    },
    {
      image: './assets/avatars/organisers/Meenakshi.jpg',
      link: 'https://www.linkedin.com/in/meenakshi-ar-77223a2a2/',
      title: 'Meenakshi',
      description: 'Treasurer'
    },
    {
      image: './assets/avatars/organisers/Harini.png',
      link: 'https://www.linkedin.com/in/harini-murugan-59490a2a1/',
      title: 'Harini',
      description: 'Treasurer'
    }
  ];

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* TrueFocus text on top */}
      <div className="absolute top-0 left-0 w-full z-10 py-4">
        <TrueFocus
          sentence="SYMPO ORGANISERS"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>

      {/* Infinite menu container */}
      <div className="absolute inset-0 mt-20">
        <InfiniteMenu items={items} />
      </div>
    </div>
  );
}

export default Members;
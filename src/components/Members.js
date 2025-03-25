import InfiniteMenu from './InfiniteMenu'
import TextPressure from './Text';
import TrueFocus from './TrueFocus';

const Members = () => {
  const items = [
    {
      image: 'https://picsum.photos/300/300?grayscale',
      link: 'https://google.com/',
      title: 'Nandha Kumar',
      description: 'President'
    },
    {
      image: './assets/venkat.jpeg',
      link: 'https://google.com/',
      title: 'Venkatesh',
      description: 'Vice President'
    },
    {
      image: 'https://picsum.photos/500/500?grayscale',
      link: 'https://google.com/',
      title: 'Meenakshi',
      description: 'Treasurer'
    },
    {
      image: 'https://picsum.photos/600/600?grayscale',
      link: 'https://google.com/',
      title: 'Harini',
      description: 'Treasurer'
    }
  ];

  return (
    <div className="relative min-h-screen h-screen bg-black overflow-hidden">
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
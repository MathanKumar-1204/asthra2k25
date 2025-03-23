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
<div className="relative h-screen flex items-center justify-center">
      {/* TrueFocus text on top */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-10">
        <TrueFocus
          sentence="SYMPO ORGANISERS"
          manualMode={true}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>

      {/* Infinite menu below */}
      <div className="relative w-full">
        <InfiniteMenu items={items} />
      </div>
    </div>)}
export default Members;
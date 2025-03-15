import InfiniteMenu from './InfiniteMenu'
const Members = () => {
const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Nandha Kumar',
    description: 'President'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Meenakshi',
    description: 'Vice President'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Venkatesh',
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
<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu text-white items={items}/>
</div>)}
export default Members;
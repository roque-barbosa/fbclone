import React from 'react';
import StoryCard from './StoryCard';

type Story = {
  name: string,
  src:string,
  profile:string
}
const stories:Story[] = [
  {
    name: "Abomildo",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v"
  },
  {
    name: "Abomildo",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk"
  },
  {
    name: "Abomildo",
    src: "https://links.papareact.com/k2j",
    profile: "https://links.papareact.com/f0p"
  },
  {
    name: "Abomildo",
    src: "https://links.papareact.com/xql",
    profile: "https://links.papareact.com/snf"
  },
  {
    name: "Abomildo",
    src: "https://links.papareact.com/4u4",
    profile: "https://links.papareact.com/zvy"
  },
];

const Stories:React.FC = () => {
  return (
    <div className='
      flex
      justify-center
      space-x-3
      mx-auto
    '>
      {stories.map(story => (
        <StoryCard
        name={story.name}
        src={story.src}
        profile={story.profile}
      />
      ))}
    </div>
  );
}
export default Stories;
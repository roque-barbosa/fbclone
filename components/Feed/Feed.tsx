import React from 'react'
import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

const Feed:React.FC = () => {
  return (
    <div className='
    flex-grow
    h-screen
    pb-44
    pt-6
    mr-4
    overflow-y-auto
    scrollbar-hide
    '>
      {/* Sotires */}
      <Stories />
      {/* InputBox */}
      <InputBox />
      {/* Posts */}
      <Posts />
    </div>
  )
}

export default Feed;

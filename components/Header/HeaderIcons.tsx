import React from 'react';

interface HeaderIconProps {
  Icon: any
  active?: boolean
}

const HeaderIcon: React.FC<HeaderIconProps> = ({Icon, active}) => {

  return (
    <div className='
      flex
      items-center
      cursor-pointer
      md:px-10
      sm:h-14
      md:hover:bg-gray-100
      rounded-xl
      active:border-b-2
      active:border-blue-500
      flex-shrink
      group
    '>
      <Icon className={`
        h-5
        sm:h-7
        text-gray-500
        mx-auto
        group-hover:text-blue-500
        text-center
        ${active && 'text-blue-500'}
      `}/>
    </div>
  );
}

export default HeaderIcon;
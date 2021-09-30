import React from 'react'
import {
  DotsHorizontalIcon,
  VideoCameraIcon
} from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import Contact from './Contact'

type contact= {
  src: string;
  name: string;
}

// HardCoded Contacts
const contacts: contact[] = [
  {src: 'https://links.papareact.com/f0p', name: 'Harry Potter'},
  {src: 'https://links.papareact.com/f0p', name: 'Harry Potter'},
  {src: 'https://links.papareact.com/f0p', name: 'Harry Potter'},
  {src: 'https://links.papareact.com/f0p', name: 'Harry Potter'},
  {src: 'https://links.papareact.com/f0p', name: 'Harry Potter'},
]

const Widgets: React.FC = () => {
  return (
    <div className='
    hidden
    lg:flex
    flex-col
    w-60
    p-2
    mt-5
    '>
      <div className='
        flex
        justify-between
        items-center
        text-gray-500
      '>
        <h2 className='text-xl'>Contacts</h2>
        <div className='
          flex
          space-x-2
        '>
          <VideoCameraIcon className='h-8' />
          <SearchIcon className='h-8' />
          <DotsHorizontalIcon className='h-8' />
        </div>
      </div>

      {contacts.map((contact: contact) => (
        <Contact key={contact.src} src={contact.src} name={contact.name} />
      ))}
    </div>
  );
}
export default Widgets;
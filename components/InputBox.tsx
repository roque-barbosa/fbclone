import React, { useRef } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import {
  CameraIcon,
  VideoCameraIcon
} from '@heroicons/react/solid';
import { db } from '../firebase';
import * as firestore from "firebase/firestore"
import * as firestorage from 'firebase/storage'

const InputBox:React.FC = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [session, loading] = useSession();

  const sendPost = async (event: any) => {
    event.preventDefault();
    
    if (!inputRef.current?.value) return;
    
    const docRef = firestore.addDoc(
      firestore.collection(db, 'posts'),
      {
        message: inputRef.current.value,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        timestamp: firestore.serverTimestamp(),
      }
    );
    inputRef.current.value = "";
  }

  return(
    <div className='
      bg-white
      p-2
      rounded-2xl
      shadow-md
      text-gray-500
      font-medium
      mt-6

    '>
      {/* TopFalf */}
      <div className='
        flex
        space-x-4
        p-4
        items-center
      '>
        <Image
          className='rounded-full'
          src={session!.user!.image!}
          width={40}
          height={40}
          layout='fixed'
        />
        <form className='
          flex
          flex-1
        '>
          <input
            className='
              rounded-full
              h-12
              bg-gray-100
              flex-grow
              px-5
              outline-none
            '
            type="text"
            placeholder={`what's on your mind, ${session!.user!.name!}?`}
            ref={inputRef}
          />
          <button
            hidden
            type='submit'
            onClick={sendPost}
          >
            
          </button>
        </form>
      </div>

      {/* BottomHalf */}
      <div className='
        flex
        justify-evenly
        p-3
        border-1
      '>
        <div className='inputIcon'>
          <VideoCameraIcon className='
            h-7
            text-red-500
          '/>
          <p className='
            text-xs
            sm:text-xs
            xl:text-base
          '>
            Live Video
          </p>
        </div>
        <div className='inputIcon'>
          <CameraIcon className='
            h-7
            text-green-400
          '/>
          <p className='
            text-xs
            sm:text-xs
            xl:text-base
          '>
            Photo/Video
          </p>
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='
            h-7
            text-yellow-300
          '/>
          <p className='
            text-xs
            sm:text-xs
            xl:text-base
          '>
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
}
export default InputBox;
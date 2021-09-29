import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import {
  CameraIcon,
  VideoCameraIcon
} from '@heroicons/react/solid';
import { db, storage } from '../../firebase';
import * as firestore from "firebase/firestore"
import * as firestorage from 'firebase/storage'

const InputBox:React.FC = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [session, _loading] = useSession();
  const [imageToPost, setImageToPost] = useState(null);

  const addImageToPost = (event: any) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = ((reqderEvent: any) => {
      setImageToPost(reqderEvent.target.result)
    })
  }

  const removeImage = () => {
    setImageToPost(null);
  }

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
    ).then( doc => {
      if (imageToPost) {
        const fireabseRef = firestorage.ref(storage, `posts/${doc.id}`)
        const uploadTask = firestorage.uploadString(
          fireabseRef,
          imageToPost,
          'data_url',
        );

        removeImage();

        uploadTask
        .then((uploadResult) => {
          firestorage.getDownloadURL(fireabseRef)
          .then(url => {
            firestore.setDoc(
              firestore.doc(db, `posts/${doc.id}`),
              { postImage: url },
              { merge: true },
            );
          })
        })
        .catch((err) => console.log(err.message))
      }
    });
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
            Submit
          </button>
        </form>

        {imageToPost && (
          <div onClick={removeImage} className='
          flex
          flex-col
          hover:brightness-110
          transition
          duration-150
          transform
          hover:scale-105
          cursor-pointer
          '>
            <img className='h-10 object-contain' src={imageToPost}/>
            <p className='
              text-xs
              text-red-500
              text-center
            '>
              Remove
            </p>
          </div>
        )}
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
        <div onClick={() => filePickerRef.current?.click()} className='inputIcon'>
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
          <input ref={filePickerRef} onChange={addImageToPost} type='file' hidden/>
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
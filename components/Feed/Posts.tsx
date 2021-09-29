import React, {useState} from 'react';
import { db } from '../../firebase'
import {collection, query, onSnapshot, orderBy} from "firebase/firestore"
import Post from './Post';


const Posts: React.FC = () => {

  const collectionRef  = collection(db, 'posts')
  const [posts, setPosts] = useState(Array());

  const q = query(collectionRef, orderBy('timestamp'));

  onSnapshot(q, (querySnapshot) => {
    const newPosts: any[] = [];
    querySnapshot.forEach((post) => {
      newPosts.push(post.data())
    });
    setPosts(newPosts);
  })
  

  return(
    <div>
      {
        posts.map(post => (
          <Post
            key={post.id}
            name={post.name}
            message={post.message}
            email={post.email}
            timestamp={post.timestamp}
            image={post.image}
            postImage={post.postImage}
          />
        ))
      }
    </div>
  );
}
export default Posts;
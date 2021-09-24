import * as firebase from "firebase/app"
import * as firestore from "firebase/firestore"
import * as firestorage from 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyCWUWbPqzhuEVb9q_hOOvpGFXAkIqmW8l8",
  authDomain: "fb-clone-5a14f.firebaseapp.com",
  projectId: "fb-clone-5a14f",
  storageBucket: "fb-clone-5a14f.appspot.com",
  messagingSenderId: "443241448074",
  appId: "1:443241448074:web:8b6fb11318d72d80dce373"
};

// const app = firebase.getApps.length ?
//   firebase.initializeApp(firebaseConfig) : firebase.getApp();
const app = firebase.initializeApp(firebaseConfig);

const db = firestore.getFirestore();
const storage = firestorage.getStorage();

export { db, storage};
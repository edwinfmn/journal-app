// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLHmutFy4UTfJyIOXP6FWkTkey6bbAVyE",
  authDomain: "react-cursos-cecb1.firebaseapp.com",
  projectId: "react-cursos-cecb1",
  storageBucket: "react-cursos-cecb1.appspot.com",
  messagingSenderId: "837788378601",
  appId: "1:837788378601:web:cc5472042aef1fbf3a5778"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );
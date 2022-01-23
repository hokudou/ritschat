// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBsLXRNooBLfV0_--sAGZcSp5385LPiypg",
  authDomain: "rit-s-chat-12c41.firebaseapp.com",
  projectId: "rit-s-chat-12c41",
  storageBucket: "rit-s-chat-12c41.appspot.com",
  messagingSenderId: "78880385342",
  appId: "1:78880385342:web:387ad6eac79b79fe88246f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage};
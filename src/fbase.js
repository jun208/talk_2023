// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey:process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId:"kakao-b82fc",
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_APP_ID


  // apiKey: "AIzaSyAops0RffUAUy1yWILCUDG5mBUu1wMTFQU",
  // authDomain: "kakao-b82fc.firebaseapp.com",
  // projectId: "kakao-b82fc",
  // storageBucket: "kakao-b82fc.appspot.com",
  // messagingSenderId: "912179204698",
  // appId: "1:912179204698:web:bb506b5d20d0499c1ffe63"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

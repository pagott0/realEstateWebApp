// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoFmavMCHFi89JLzJcNp2FwBQGaRQjByg",
  authDomain: "signup-app-9f405.firebaseapp.com",
  projectId: "signup-app-9f405",
  storageBucket: "signup-app-9f405.appspot.com",
  messagingSenderId: "911288795898",
  appId: "1:911288795898:web:76dd6b4a99ec41ae233f43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
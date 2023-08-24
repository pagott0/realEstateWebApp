// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP_3DFZXxSDY5OIb2Lm9j3p6Qv3wtDc6w",
  authDomain: "ch-enzo-learning-app.firebaseapp.com",
  projectId: "ch-enzo-learning-app",
  storageBucket: "ch-enzo-learning-app.appspot.com",
  messagingSenderId: "85295938984",
  appId: "1:85295938984:web:2cf6a3af76e4ddf9a7f19d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
export const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);
export const storage = getStorage(app);
connectStorageEmulator(storage, "127.0.0.1", 9199);
export const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);



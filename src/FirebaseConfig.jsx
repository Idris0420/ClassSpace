// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl4yble0NF4t3i5FCALJl8XbZNY2nJgzE",
  authDomain: "classspace-db5d2.firebaseapp.com",
  projectId: "classspace-db5d2",
  storageBucket: "classspace-db5d2.firebasestorage.app",
  messagingSenderId: "411887990451",
  appId: "1:411887990451:web:fcb068cce8591dbfb522c6",
  measurementId: "G-ETMP27FRYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
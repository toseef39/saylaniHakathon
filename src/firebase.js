// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnjFIQ1vvaRss9Td-5cd8Pg27SQCA1FEk",
  authDomain: "smithakaton.firebaseapp.com",
  projectId: "smithakaton",
  storageBucket: "smithakaton.firebasestorage.app",
  messagingSenderId: "538580647885",
  appId: "1:538580647885:web:9d90f42a4398a73db38e84",
  measurementId: "G-FQS41QPB1C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { db, auth, googleProvider, appleProvider };

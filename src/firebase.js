// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcTTGY_PzuT8geKugdoMkHxgwOaCBpQgY",
    authDomain: "amigo-secreto-2d419.firebaseapp.com",
    projectId: "amigo-secreto-2d419",
    storageBucket: "amigo-secreto-2d419.firebasestorage.app",
    messagingSenderId: "929837860264",
    appId: "1:929837860264:web:2b3b4ead5cb8746725c99d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

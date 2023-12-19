import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBOXn0-cYHQi5rqDvEsF82YnjYhYUYMzAA",
    authDomain: "web-assignment1-768e8.firebaseapp.com",
    projectId: "web-assignment1-768e8",
    storageBucket: "web-assignment1-768e8.appspot.com",
    messagingSenderId: "455420915206",
    appId: "1:455420915206:web:425f7dee1c113ce9c49d87",
    measurementId: "G-3KFG0Z0JWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export  const fireStore = getFirestore(app);
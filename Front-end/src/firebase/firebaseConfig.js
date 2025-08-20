// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCkCab3GUgRuGdj1XNWSqliwA1tHUYn5k",
    authDomain: "fishai.firebaseapp.com",
    projectId: "fishai",
    storageBucket: "fishai.appspot.com",
    messagingSenderId: "220432357509",
    appId: "1:220432357509:web:cbbf25f1ffaac21892f1ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});
const storage = getStorage( app );
export {auth, db, storage};
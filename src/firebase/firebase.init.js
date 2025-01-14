// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrkAx85zXaz3Q08lEvLNoEgB3C6x075Zo",
    authDomain: "soulmatch-b2923.firebaseapp.com",
    projectId: "soulmatch-b2923",
    storageBucket: "soulmatch-b2923.firebasestorage.app",
    messagingSenderId: "191476296591",
    appId: "1:191476296591:web:6ce05b68b1ff5a375cf9fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
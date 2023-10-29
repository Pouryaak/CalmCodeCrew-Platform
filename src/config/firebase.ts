// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCa3U6xTkzjd2pLnhQG0D-GefICh2aONZQ",
    authDomain: "calmcodecrew.firebaseapp.com",
    projectId: "calmcodecrew",
    storageBucket: "calmcodecrew.appspot.com",
    messagingSenderId: "10837964987",
    appId: "1:10837964987:web:e0f48a72446388fb29519e",
    measurementId: "G-46NK4GFLEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db, auth
}
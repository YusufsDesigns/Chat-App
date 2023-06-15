// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmYOXd5zWjvgZp_jYcjhrx4wP6zQso1iE",
    authDomain: "chat-app-c1ea9.firebaseapp.com",
    projectId: "chat-app-c1ea9",
    storageBucket: "chat-app-c1ea9.appspot.com",
    messagingSenderId: "473583953897",
    appId: "1:473583953897:web:e3b9f07fb040d09e190d78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
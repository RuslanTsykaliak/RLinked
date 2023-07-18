// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWR0_5yLGJdim6l3ByG8ZeVbzr9RXXwKc",
    authDomain: "rlinked-c9e47.firebaseapp.com",
    projectId: "rlinked-c9e47",
    storageBucket: "rlinked-c9e47.appspot.com",
    messagingSenderId: "1051434217869",
    appId: "1:1051434217869:web:2ce77f052b0d2d0eafcdc4"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };

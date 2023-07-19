import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { auth } from "../firebaseConfig";
  
  // Function to log in the user with the provided email and password
  export const LoginAPI = (email, password) => {
    try {
      // Call the signInWithEmailAndPassword method with the auth instance and provided email and password
      let response = signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err; 
    }
  };
  
  // Function to register a new user with the provided email and password
  export const RegisterAPI = (email, password) => {
    try {
      // Call the createUserWithEmailAndPassword method with the auth instance and provided email and password
      let response = createUserWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err;
    }
  };
  
  // Function to sign in with Google authentication
  export const GoogleSignInAPI = () => {
    try {
      let googleProvider = new GoogleAuthProvider();
      // Call the signInWithPopup method with the auth instance and the GoogleAuthProvider
      let res = signInWithPopup(auth, googleProvider);
      return res;
    } catch (err) {
      return err;
    }
  };
  
  // Function to log out the currently authenticated user
  export const onLogout = () => {
    try {
      // Call the signOut method with the auth instance to log out the user
      signOut(auth);
    } catch (err) {
      return err;
    }
  };
  
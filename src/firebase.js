import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "nerby-business.firebaseapp.com",
  projectId: "nerby-business",
  storageBucket: "nerby-business.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const auth = fb.auth();

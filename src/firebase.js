import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const fireDb = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default fireDb.database().ref();

// const firebaseConfig = {
//   apiKey: "AIzaSyA3SUQj8WTLh7qV-DOVAUOH1sldsHWmZQ4",
//   authDomain: "react-twitter-1ec0b.firebaseapp.com",
//   databaseURL:
//     "https://react-twitter-1ec0b-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "react-twitter-1ec0b",
//   storageBucket: "react-twitter-1ec0b.appspot.com",
//   messagingSenderId: "72562846999",
//   appId: "1:72562846999:web:d19142c26bed916f8d1b52",
//   measurementId: "G-CDZSJK6JS3",
// };

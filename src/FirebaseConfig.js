import firebase from '@firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from '@firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDDxmeSHdfcHy8B2OBmKM--c7hw1YJgA-k",
  authDomain: "itribez-rn.firebaseapp.com",
  projectId: "itribez-rn",
  storageBucket: "itribez-rn.appspot.com",
  messagingSenderId: "776399912728",
  appId: "1:776399912728:web:05944ae80139d9c547686d",
  measurementId: "G-TB7X0NX347"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, analytics, auth, firebase };

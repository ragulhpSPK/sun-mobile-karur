import firebase from "./firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1SHRPQGxUhYvldY5yPhS1n8Z1poGnxTg",
  authDomain: "auth-15623.firebaseapp.com",
  projectId: "auth-15623",
  storageBucket: "auth-15623.appspot.com",
  messagingSenderId: "570956977175",
  appId: "1:570956977175:web:a601c890a4c97c39147852",
  measurementId: "G-DEJBBC3DP2",
};
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

// export default db;

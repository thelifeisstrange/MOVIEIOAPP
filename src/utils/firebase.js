// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { firebaseConfig } from "../config/firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
export { app, dbRef };

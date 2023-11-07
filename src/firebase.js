import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-demo-2af38.firebaseapp.com",
  projectId: "react-demo-2af38",
  storageBucket: "react-demo-2af38.appspot.com",
  messagingSenderId: "932999764439",
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
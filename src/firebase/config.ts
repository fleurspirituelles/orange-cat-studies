import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgxS38uo1Hx6yU_nl3b8W_ztNZ5UOMxs4",
  authDomain: "purr-529da.firebaseapp.com",
  projectId: "purr-529da",
  storageBucket: "purr-529da.appspot.com",
  messagingSenderId: "1063632010533",
  appId: "1:1063632010533:web:889b30a4c60e5cbc97aecc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
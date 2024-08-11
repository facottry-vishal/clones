
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAkAFFHxZAIRN2XBLpta4MuCe2_kZ8XpyY",
  authDomain: "netflix-project-d4b3f.firebaseapp.com",
  projectId: "netflix-project-d4b3f",
  storageBucket: "netflix-project-d4b3f.appspot.com",
  messagingSenderId: "178622958183",
  appId: "1:178622958183:web:a61b8cbc5af4529567a2c2",
  measurementId: "G-D1KPLMEB9C"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
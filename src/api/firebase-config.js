import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBa3UnUcOcPGffL6DshJUyxQBDdTN6_AFM",
    authDomain: "manager-8a20f.firebaseapp.com",
    projectId: "manager-8a20f",
    storageBucket: "manager-8a20f.appspot.com",
    messagingSenderId: "370616630199",
    appId: "1:370616630199:web:eed5d3d4860596ec5e4632",
    measurementId: "G-XGFE2YF5Z9"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
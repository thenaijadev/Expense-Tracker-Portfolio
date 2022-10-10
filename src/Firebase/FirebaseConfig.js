import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDzYGBS9INAFYKd2tXAhpyC9DMHq5sKsoA",
  authDomain: "expense-tracker-portfolio-1.firebaseapp.com",
  projectId: "expense-tracker-portfolio-1",
  storageBucket: "expense-tracker-portfolio-1.appspot.com",
  messagingSenderId: "610477937178",
  appId: "1:610477937178:web:ff94fb668e8d4d9c7237a3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

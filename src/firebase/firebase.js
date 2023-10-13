// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtMnlIbzeOOTf8FdTLcaT5NwN9OSY6ZPk",
  authDomain: "crackit-770ca.firebaseapp.com",
  projectId: "crackit-770ca",
  storageBucket: "crackit-770ca.appspot.com",
  messagingSenderId: "864608849971",
  appId: "1:864608849971:web:4cc0d980a1be0cc7065346",
  measurementId: "G-05ZL1EJVPE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

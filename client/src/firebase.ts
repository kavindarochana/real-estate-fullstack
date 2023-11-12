// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'real-estate-a8aaf.firebaseapp.com',
  projectId: 'real-estate-a8aaf',
  storageBucket: 'real-estate-a8aaf.appspot.com',
  messagingSenderId: '271570798892',
  appId: '1:271570798892:web:09a2e88247f7ae2e388489',
  measurementId: 'G-8QYZXQPDPM',
};

console.log('xxxx ', import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);

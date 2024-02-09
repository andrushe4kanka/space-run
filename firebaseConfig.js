import { initializeApp, getApp } from 'firebase/app';

// Optionally import the services that you want to use
import {  initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: "space-run-9e906.firebaseapp.com",
    projectId: "space-run-9e906",
    storageBucket: "space-run-9e906.appspot.com",
    messagingSenderId: "667534294321",
    appId: "1:667534294321:web:d440757aa46f6404510410"
  };

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
  });
  
  export { app, auth };

  // initialize Firebase Auth for that app immediately

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


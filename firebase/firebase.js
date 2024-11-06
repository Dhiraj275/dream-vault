// firebase.ts or firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ENV from "../environment"
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

// Your Firebase config
const firebaseConfig = {
  apiKey: ENV.apiKey,
  authDomain: ENV.authDomain,
  projectId: ENV.projectId,
  storageBucket: ENV.storageBucket,
  messagingSenderId: ENV.messagingSenderId,
  appId: ENV.appId,
  measurementId: ENV.measurementId,
  databaseURL: ENV.databaseURL,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize other Firebase services
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(app)
export { app, database, auth, storage };

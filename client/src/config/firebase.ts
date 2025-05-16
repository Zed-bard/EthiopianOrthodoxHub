import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCustomToken } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Telegram authentication setup
import telegramAuth from '../services/telegramAuth';

export const signInWithTelegram = async () => {
  try {
    // Open Telegram login widget
    const telegramData = await window.Telegram.WebApp.initData;
    
    // Authenticate with Telegram
    const customToken = await telegramAuth(telegramData);
    const result = await signInWithCustomToken(auth, customToken);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Telegram:', error);
    throw error;
  }
};

export default app;

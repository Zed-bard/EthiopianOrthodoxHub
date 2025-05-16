import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCustomToken } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBApEZ7-sj5IcG8SuSOSrdNvro_gQy8L6s",
  authDomain: "xofoo-gabre-kiristos.firebaseapp.com",
  projectId: "xofoo-gabre-kiristos",
  storageBucket: "xofoo-gabre-kiristos.firebasestorage.app",
  messagingSenderId: "13372301528",
  appId: "1:13372301528:web:55e3980165b1517b12b7ad"
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

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export default app;

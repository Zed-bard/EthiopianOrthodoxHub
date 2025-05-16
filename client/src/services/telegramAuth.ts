import axios from 'axios';
import { auth } from '../config/firebase';
import { signInWithCustomToken } from 'firebase/auth';

const telegramAuth = async (telegramData: any) => {
  try {
    // Validate Telegram data
    const validationUrl = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/getMe`;
    const response = await axios.get(validationUrl);
    
    if (!response.data.ok) {
      throw new Error('Invalid Telegram bot token');
    }

    // Create custom token for Firebase
    const customToken = await axios.post('/api/auth/telegram', {
      telegramData,
      botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    });

    // Sign in with custom token
    const result = await signInWithCustomToken(auth, customToken.data.token);

    return customToken.data.token;
  } catch (error) {
    console.error('Telegram authentication error:', error);
    throw error;
  }
};

export default telegramAuth;

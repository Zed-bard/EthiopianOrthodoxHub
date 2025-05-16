import axios from 'axios';
import { auth } from '../config/firebase';
import { signInWithCustomToken } from 'firebase/auth';

const telegramAuth = async (telegramData: any) => {
  try {
    // Validate Telegram data
    const botToken = "7955126262:AAE5VK1q2iVFlkQYux3WPCQnfZesZ-NhDeA";
    const validationUrl = `https://api.telegram.org/bot${botToken}/getMe`;
    const response = await axios.get(validationUrl);
    
    if (!response.data.ok) {
      throw new Error('Invalid Telegram bot token');
    }

    // Create custom token for Firebase
    const customToken = await axios.post('/api/auth/telegram', {
      telegramData,
      botToken
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

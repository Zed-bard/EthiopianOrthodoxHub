import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import crypto from 'crypto';

// Initialize Firebase Admin
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : require('../service-account.json');

if (!initializeApp.length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

export const validateTelegramAuth = (botToken: string, authData: any) => {
  const { hash, ...data } = authData;
  
  // Sort the data alphabetically
  const dataArr = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
  
  // Create the data check string
  const dataCheckString = dataArr
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  // Create the secret key from bot token
  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();
  
  // Calculate hash
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  return calculatedHash === hash;
};

export const createCustomToken = async (telegramData: any) => {
  try {
    // Create custom user claims with Telegram data
    const customClaims = {
      telegram: {
        id: telegramData.id,
        username: telegramData.username,
        firstName: telegramData.first_name,
        lastName: telegramData.last_name
      }
    };

    // Create or update user in Firebase
    const uid = `telegram:${telegramData.id}`;
    
    try {
      await getAuth().getUser(uid);
    } catch (error) {
      // User doesn't exist, create a new one
      await getAuth().createUser({
        uid,
        displayName: telegramData.username || `${telegramData.first_name} ${telegramData.last_name}`.trim(),
        photoURL: telegramData.photo_url
      });
    }

    // Set custom claims
    await getAuth().setCustomUserClaims(uid, customClaims);

    // Generate custom token
    const customToken = await getAuth().createCustomToken(uid);
    
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
};

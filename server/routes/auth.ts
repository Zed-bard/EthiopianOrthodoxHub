import { Router } from 'express';
import { validateTelegramAuth, createCustomToken } from '../auth/telegramAuth';

const router = Router();

router.post('/auth/telegram', async (req, res) => {
  try {
    const { telegramData, botToken } = req.body;

    // Validate Telegram authentication
    if (!validateTelegramAuth(botToken, telegramData)) {
      return res.status(401).json({ error: 'Invalid authentication data' });
    }

    // Generate custom token
    const customToken = await createCustomToken(telegramData);

    res.json({ token: customToken });
  } catch (error) {
    console.error('Error in Telegram authentication:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router;

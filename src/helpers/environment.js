import dotenv from 'dotenv';

const configure = () => dotenv.config();

const get = () => ({
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  lastFmApiKey: process.env.LAST_FM_API_KEY,
  lastFmSecretKey: process.env.LAST_FM_SHARED_SECRET,
});

export default {
  configure,
  get,
};

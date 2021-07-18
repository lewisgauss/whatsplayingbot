import dotenv, { DotenvConfigOutput } from 'dotenv';
import { IEnvironment } from 'src/common/types';

const configure = (): DotenvConfigOutput => dotenv.config();

const get = (): IEnvironment => ({
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  lastFmApiKey: process.env.LAST_FM_API_KEY || '',
  lastFmSecretKey: process.env.LAST_FM_SHARED_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  herokuUrl: process.env.HEROKU_URL || '',
});

export default {
  configure,
  get,
};

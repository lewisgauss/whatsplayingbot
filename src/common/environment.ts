import dotenv, { DotenvConfigOutput } from 'dotenv';
import { IEnvironment } from 'src/common/types';

const configure = (): DotenvConfigOutput => dotenv.config();

const get = (): IEnvironment => ({
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  lastFmApiKey: process.env.LAST_FM_API_KEY || '',
  lastFmSecretKey: process.env.LAST_FM_SHARED_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  appUrl: process.env.APP_URL || '',
  port: process.env.PORT ? +process.env.PORT : 443,
  host: process.env.HOST || '0.0.0.0',
  groupChatIds: process.env.GROUP_CHAT_IDS || '',
  redisUrl: process.env.REDIS_URL || '',
  redisPassword: process.env.REDIS_PASSWORD || '',
});

export default {
  configure,
  get,
};

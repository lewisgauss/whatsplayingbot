import environment from './common/environment';
import WhatsPlayingBot from './WhatsPlayingBot';

console.info("Getting What's Playing Bot ready...");

environment.configure();

const environmentConfigured = environment.get();

console.info(`Environment: ${JSON.stringify(environmentConfigured)}`);

const whatsPlayingBot = new WhatsPlayingBot(
  environmentConfigured.lastFmApiKey,
  environmentConfigured.lastFmSecretKey,
  environmentConfigured.telegramBotToken,
  {
    polling: true,
    filepath: false,
  },
);

console.info("What's Playing Bot is now listening for requests...");

whatsPlayingBot.startListening();

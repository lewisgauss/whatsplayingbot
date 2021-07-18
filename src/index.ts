import environment from './common/environment';
import WhatsPlayingBot from './WhatsPlayingBot';

console.info("Getting What's Playing Bot ready...");

console.log(process.env);

environment.configure();

const environmentConfigured = environment.get();

console.info(`Environment: ${JSON.stringify(environmentConfigured)}`);

const whatsPlayingBot =
  environmentConfigured.nodeEnv === 'production'
    ? new WhatsPlayingBot(
        environmentConfigured.lastFmApiKey,
        environmentConfigured.lastFmSecretKey,
        environmentConfigured.telegramBotToken,
        {
          filepath: false,
          webHook: {
            port: environmentConfigured.port,
            host: environmentConfigured.host,
          },
        },
      )
    : new WhatsPlayingBot(
        environmentConfigured.lastFmApiKey,
        environmentConfigured.lastFmSecretKey,
        environmentConfigured.telegramBotToken,
        {
          polling: true,
          filepath: false,
        },
      );

if (environmentConfigured.nodeEnv === 'production') {
  whatsPlayingBot.setWebHook(
    `${environmentConfigured.herokuUrl}:443/bot${environmentConfigured.telegramBotToken}`,
  );
}

console.info("What's Playing Bot is now listening for requests...");

whatsPlayingBot.startListening();

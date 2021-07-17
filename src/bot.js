import TelegramBot from 'node-telegram-bot-api';
import environment from './environment';
import redisClient from './redisClient';
import LastFM from './LastFM';
import Users from './Users';

export default () => {
  const redis = redisClient();

  redis.on('ready', () => init(redis));

  redis.on('error', (error) => console.error(error));
};

function init(redis) {
  const currentEnvironment = environment.get();

  const telegramBot = new TelegramBot(currentEnvironment.telegramBotToken, { polling: true });

  const lastFM = new LastFM(currentEnvironment.lastFmApiKey, currentEnvironment.lastFmSecretKey);

  const users = new Users(redis);

  // Matches "/setuser {username}"
  telegramBot.onText(/\/setuser (.+)/, async (message, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    console.log(message);

    const chatId = message.chat.id;
    const telegramUsername = message.chat.username;
    const lastFmUsername = match[1];

    const exist = await lastFM.checkUsernameExists(lastFmUsername);

    const reply = exist
      ? `Your Last.fm username is set to ${lastFmUsername}`
      : 'Could not find your Last.fm username.';

    if (exist) {
      users.set(telegramUsername, lastFmUsername);
    }

    console.log(reply);

    telegramBot.sendMessage(chatId, reply);
  });

  // Matches "/np"
  telegramBot.onText(/\/np/, async (message) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    console.log(message);

    const chatId = message.chat.id;
    const telegramUsername = message.chat.username;

    const user = await users.get(telegramUsername);

    if (!user) {
      const reply = `Please set your Last.fm username.`;

      telegramBot.sendMessage(chatId, reply);

      return;
    }

    const mostRecentTrack = await lastFM.getMostRecentTrack(user);

    const reply = mostRecentTrack.name;

    console.log(reply);

    telegramBot.sendMessage(chatId, reply);
  });
}

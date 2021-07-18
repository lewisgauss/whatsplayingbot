import TelegramBot from 'node-telegram-bot-api';
import redis from 'redis';
import redisClient from './common/redisClient';
import LastFmClient from './LastFmClient/LastFmClient';

class WhatsPlayingBot extends TelegramBot {
  private lastFmClient: LastFmClient;

  private redisClient: redis.RedisClient;

  constructor(
    apiKey: string,
    sharedSecret: string,
    botToken: string,
    botOptions: TelegramBot.ConstructorOptions | undefined,
  ) {
    super(botToken, botOptions);

    this.lastFmClient = new LastFmClient(apiKey, sharedSecret);
    this.redisClient = redisClient.create();

    this.handleSetUser = this.handleSetUser.bind(this);
    this.handleNowPlaying = this.handleNowPlaying.bind(this);
  }

  public startListening(): void {
    this.onText(/\/setuser (.+)/, this.handleSetUser);
    this.onText(/\/np/, this.handleNowPlaying);
  }

  private async handleSetUser(
    message: TelegramBot.Message,
    match: RegExpExecArray | null,
  ): Promise<void> {
    const chatId = message.chat.id;
    const telegramUsername = message.chat.username;
    const lastFmUsername = match?.[1];

    if (telegramUsername == null || lastFmUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Telegram username.');

      return;
    }

    const user = await this.lastFmClient.getUserInfo(lastFmUsername);

    if (user == null) {
      this.sendMessage(chatId, 'Please set a valid Last.fm username.');

      return;
    }

    await this.redisClient.setAsync(telegramUsername, 'yeowwwai');

    this.sendMessage(chatId, `Your Last.fm username is set to yeowwwai.`);
  }

  private async handleNowPlaying(message: TelegramBot.Message): Promise<void> {
    const chatId = message.chat.id;
    const telegramUsername = message.chat.username;

    if (telegramUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Telegram username.');

      return;
    }

    const lastFmUsername = await this.redisClient.getAsync(telegramUsername);

    if (lastFmUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Last.fm username.');

      return;
    }

    const replyName = message.chat.first_name || message.chat.username || 'Unknown User';
    const mostRecentTrack = await this.lastFmClient.getMostRecentTrack(lastFmUsername);

    if (mostRecentTrack == null) {
      this.sendMessage(chatId, `No recent track was found for ${replyName}.`);

      return;
    }

    const songName = `${mostRecentTrack.artist['#text']} — ${mostRecentTrack.name}`;

    const replyMessage = mostRecentTrack['@attr']?.nowplaying
      ? `${replyName} is listening to ${songName}.`
      : `${replyName} last listened to ${songName}.`;

    this.sendMessage(chatId, replyMessage);
  }
}

export default WhatsPlayingBot;

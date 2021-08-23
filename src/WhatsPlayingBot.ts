import TelegramBot from 'node-telegram-bot-api';
import redis from 'redis';
import redisClient from './common/redisClient';
import LastFmClient from './LastFmClient/LastFmClient';
import telegramMessage from './common/telegramMessage';
import environment from './common/environment';

class WhatsPlayingBot extends TelegramBot {
  private lastFmClient: LastFmClient;

  private redisClient: redis.RedisClient;

  private allowedGroupIds: number[];

  constructor(
    apiKey: string,
    sharedSecret: string,
    botToken: string,
    botOptions: TelegramBot.ConstructorOptions | undefined,
  ) {
    super(botToken, botOptions);

    this.lastFmClient = new LastFmClient(apiKey, sharedSecret);
    this.redisClient = redisClient.create();

    const environmentConfigured = environment.get();

    this.allowedGroupIds = environmentConfigured.groupChatIds.split('_').map((id) => +id);

    this.handleStart = this.handleStart.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
    this.handleSetUser = this.handleSetUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleNowPlaying = this.handleNowPlaying.bind(this);
    this.isChatIdValid = this.isChatIdValid.bind(this);
  }

  public startListening(): void {
    this.onText(/\/start/, this.handleStart);
    this.onText(/\/help/, this.handleHelp);
    this.onText(/\/setuser/, this.handleSetUser);
    this.onText(/\/deleteuser/, this.handleDeleteUser);
    this.onText(/\/np/, this.handleNowPlaying);
  }

  private handleStart(message: TelegramBot.Message): void {
    const chatId = telegramMessage.getChatId(message);

    const allowedChat = this.isChatIdValid(chatId);

    if (!allowedChat) {
      console.log(`Chat not allowed for ${chatId}.`);

      return;
    }

    const replyMessage = "Hello, this is What's Playing Bot!";

    this.sendMessage(chatId, replyMessage);
  }

  private handleHelp(message: TelegramBot.Message): void {
    const chatId = telegramMessage.getChatId(message);

    const allowedChat = this.isChatIdValid(chatId);

    if (!allowedChat) {
      console.log(`Chat not allowed for ${chatId}.`);

      return;
    }

    const replyMessage =
      "Hello, this is What's Playing Bot, a bot for Last FM! \n\n" +
      'Send /setuser to set your Last FM username. \n' +
      'Send /np to get your now playing or most recent track. \n' +
      'Send /deleteuser to delete your Last FM username.';

    this.sendMessage(chatId, replyMessage);
  }

  private async handleSetUser(message: TelegramBot.Message): Promise<void> {
    const chatId = telegramMessage.getChatId(message);
    const telegramUsername = telegramMessage.getUsername(message);
    const lastFmUsername = message.split(' ')[1];

    const allowedChat = this.isChatIdValid(chatId);

    if (!allowedChat) {
      console.log(`Chat not allowed for ${chatId}.`);

      return;
    }

    if (telegramUsername == null || lastFmUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Telegram username.');

      return;
    }

    const user = await this.lastFmClient.getUserInfo(lastFmUsername);

    if (user == null) {
      this.sendMessage(chatId, 'Please enter a valid Last FM username.');

      return;
    }

    const replyName = telegramMessage.getReplyName(message);

    await this.redisClient.setAsync(telegramUsername, lastFmUsername);

    const replyMessage = `Last FM username ${lastFmUsername} is set for ${replyName}.`;

    this.sendMessage(chatId, replyMessage);
  }

  private async handleDeleteUser(message: TelegramBot.Message): Promise<void> {
    const chatId = telegramMessage.getChatId(message);
    const telegramUsername = telegramMessage.getUsername(message);

    const allowedChat = this.isChatIdValid(chatId);

    if (!allowedChat) {
      console.log(`Chat not allowed for ${chatId}.`);

      return;
    }

    if (telegramUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Telegram username.');

      return;
    }

    const lastFmUsername = await this.redisClient.getAsync(telegramUsername);

    const replyName = telegramMessage.getReplyName(message);

    if (lastFmUsername == null) {
      this.sendMessage(chatId, `${replyName} does not have a Last FM username set.`);

      return;
    }

    this.redisClient.del(telegramUsername);

    this.sendMessage(chatId, `Successfully deleted Last FM username for ${replyName}.`);
  }

  private async handleNowPlaying(message: TelegramBot.Message): Promise<void> {
    const chatId = telegramMessage.getChatId(message);
    const telegramUsername = telegramMessage.getUsername(message);

    const allowedChat = this.isChatIdValid(chatId);

    if (!allowedChat) {
      console.log(`Chat not allowed for ${chatId}.`);

      return;
    }

    if (telegramUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Telegram username.');

      return;
    }

    const lastFmUsername = await this.redisClient.getAsync(telegramUsername);

    if (lastFmUsername == null) {
      this.sendMessage(chatId, 'Please set a valid Last FM username.');

      return;
    }

    const replyName = telegramMessage.getReplyName(message);
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

  private isChatIdValid(chatId: number): boolean {
    return this.allowedGroupIds.some((id) => id === chatId);
  }
}

export default WhatsPlayingBot;

import TelegramBot from 'node-telegram-bot-api';

const getReplyName = (message: TelegramBot.Message): string => {
  const replyName = message.from?.first_name || message.from?.username || 'Unknown User';

  return replyName;
};

const getChatId = (message: TelegramBot.Message): number => {
  return message.chat.id;
};

const getUsername = (message: TelegramBot.Message): string => {
  return message.from?.username || '';
};

export default { getReplyName, getChatId, getUsername };

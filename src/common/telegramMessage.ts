import TelegramBot from 'node-telegram-bot-api';

const getReplyName = (message: TelegramBot.Message): string => {
  const replyName = message.from?.first_name || message.from?.username || 'Unknown User';

  return replyName;
};

const getChatId = (message: TelegramBot.Message): number => {
  return message.chat.id;
};

const getUserId = (message: TelegramBot.Message): number | undefined => {
  return message.from?.id;
};

export default { getReplyName, getChatId, getUserId };

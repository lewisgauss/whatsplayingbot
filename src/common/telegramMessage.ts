import TelegramBot from 'node-telegram-bot-api';

const getReplyName = (message: TelegramBot.Message): string => {
  const replyName = message.chat.first_name || message.chat.username || 'Unknown User';

  return replyName;
};

export default { getReplyName };

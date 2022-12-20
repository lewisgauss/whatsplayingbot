const getUserIdRedisKey = (userId: number): string => `whats-playing-bot-user-id-${userId}`;

export { getUserIdRedisKey };

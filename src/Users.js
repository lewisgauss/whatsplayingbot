import { promisify } from 'util';

class Users {
  constructor(redisClient) {
    this.redis = redisClient;

    this.redis.getAsync = promisify(this.redis.get).bind(this.redis);
  }

  get(telegramUsername) {
    return this.redis.getAsync(telegramUsername);
  }

  set(telegramUsername, lastFmUsername) {
    this.redis.set(telegramUsername, lastFmUsername);
  }
}

export default Users;

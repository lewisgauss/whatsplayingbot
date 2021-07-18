import redis from 'redis';
import { promisify } from 'util';

const create = (): redis.RedisClient => {
  const client = redis.createClient();

  client.getAsync = promisify(client.get).bind(client);
  client.setAsync = promisify(client.set).bind(client);

  return client;
};

export default {
  create,
};

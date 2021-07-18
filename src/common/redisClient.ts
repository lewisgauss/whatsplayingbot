import redis from 'redis';
import { promisify } from 'util';
import url from 'url';
import environment from './environment';

const create = (): redis.RedisClient => {
  let client: redis.RedisClient;

  const environmentConfigured = environment.get();

  if (environmentConfigured.nodeEnv === 'production') {
    const rtg = url.parse(environmentConfigured.redisToGoUrl);

    const port = +!rtg.port;

    client = redis.createClient(port, rtg.hostname || undefined);
  } else {
    client = redis.createClient();
  }

  client.getAsync = promisify(client.get).bind(client);
  client.setAsync = promisify(client.set).bind(client);

  return client;
};

export default {
  create,
};

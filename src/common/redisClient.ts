import redis from 'redis';
import { promisify } from 'util';
import url from 'url';
import environment from './environment';

const create = (): redis.RedisClient => {
  let client: redis.RedisClient;

  const environmentConfigured = environment.get();

  if (environmentConfigured.nodeEnv === 'production') {
    const rtg = url.parse(environmentConfigured.redisToGoUrl);

    const port = rtg.port ? +rtg.port : 0;

    client = redis.createClient(port, rtg.hostname || undefined);

    const password = rtg?.auth?.split(':')?.[1] || '';

    client.auth(password);
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

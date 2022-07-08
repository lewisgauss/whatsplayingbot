import { createClient, IRedisClient } from 'redis';
import environment from './environment';

const create = (): IRedisClient => {
  let client: IRedisClient;

  const environmentConfigured = environment.get();

  if (environmentConfigured.nodeEnv === 'production') {
    client = createClient();
  } else {
    client = createClient({
      url: environmentConfigured.redisTlsUrl,
      socket: {
        tls: true,
        rejectUnauthorized: false,
      },
    });
  }

  client.connect();

  return client;
};

export default {
  create,
};

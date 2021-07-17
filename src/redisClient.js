import redis from 'redis';

const create = () => {
  const client = redis.createClient();

  return client;
};

export default create;

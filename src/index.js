import environment from './helpers/environment';
import bot from './bot';

console.info("Starting What's Playing Bot...");

environment.configure();

bot();

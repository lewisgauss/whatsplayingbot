# What's Playing Bot

Last.fm bot for Telegram written in Node.js with TypeScript.

## Node version

If you wish to modify the NodeJs version, you need go change it in both:

* `.nvmrc` for localhost development
* `package.json`, `engines.node` for Heroku build

## .env configurations

All configurations that you need to configure are listed in `src/common/environment.ts`

For the ease of modification, they're listed below:

```shell
GROUP_CHAT_IDS # A list of ids separated by '_'
APP_URL # App URL for Telegram bot webhooks
LAST_FM_API_KEY # Last FM API key
LAST_FM_SHARED_SECRET # Last FM API shared secret
REDISTOGO_URL # Redis To Go URL
TELEGRAM_BOT_TOKEN # Telegram bot token
REDIS_URL # Redis URL with port, for example redis://redis.service.local:1000
REDIS_PASSWORD # Redis auth password
```

## Deployment

This application is compiled to a Docker image and deployed to a GKE cluster.

[Docker Hub repository](https://hub.docker.com/r/lewisgauss/whats-playing-bot).

import fetch from './helpers/fetch';
import endpoints from './endpoints';

class LastFM {
  constructor(apiKey, sharedSecret) {
    this.apiKey = apiKey;
    this.sharedSecret = sharedSecret;
  }

  async checkUsernameExists(username) {
    const url = endpoints.getUserInfo(this.apiKey, username);

    const response = await fetch.get(url);

    return response?.user?.name === username;
  }

  async getMostRecentTrack(username) {
    const url = endpoints.getMostRecentTrack(this.apiKey, username);

    const response = await fetch.get(url);

    return response?.recenttracks?.track?.[0];
  }
}

export default LastFM;

import { ITrack, IUser } from 'src/common/types';
import LastFmApi from './LastFmApi';

class LastFmClient {
  private lastFmApi: LastFmApi;

  constructor(apiKey: string, sharedSecret: string) {
    this.lastFmApi = new LastFmApi(apiKey, sharedSecret);
  }

  async getUserInfo(username: string): Promise<IUser | undefined> {
    const userInfo = await this.lastFmApi.getUserInfo(username);

    return userInfo?.user;
  }

  async getMostRecentTrack(username: string): Promise<ITrack | undefined> {
    const recentTracks = await this.lastFmApi.getRecentTracks(username);

    const mostRecentTrack = recentTracks?.recenttracks?.track?.[0];

    return mostRecentTrack;
  }
}

export default LastFmClient;

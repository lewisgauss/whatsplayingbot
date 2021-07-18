import { IGetUserInfo, IGetRecentTracks } from 'src/common/types';
import fetch from '../common/fetch';
import endpoints from './lastFmEndpoints';

class LastFmApi {
  private apiKey: string;

  private sharedSecret: string;

  constructor(apiKey: string, sharedSecret: string) {
    this.apiKey = apiKey;
    this.sharedSecret = sharedSecret;
  }

  async getUserInfo(username: string): Promise<IGetUserInfo | null> {
    try {
      const url = endpoints.getUserInfo(this.apiKey, username);

      const response = await fetch.get<IGetUserInfo>(url);

      return response;
    } catch (error) {
      return null;
    }
  }

  async getRecentTracks(username: string): Promise<IGetRecentTracks | null> {
    try {
      const url = endpoints.getMostRecentTrack(this.apiKey, username);

      const response = await fetch.get<IGetRecentTracks>(url);

      return response;
    } catch (error) {
      return null;
    }
  }
}

export default LastFmApi;

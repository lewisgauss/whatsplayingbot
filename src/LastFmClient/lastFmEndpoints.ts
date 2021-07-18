const getUserInfo = (apiKey: string, username: string): string =>
  `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`;
const getMostRecentTrack = (apiKey: string, username: string): string =>
  `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&limit=1&format=json`;

export default {
  getUserInfo,
  getMostRecentTrack,
};

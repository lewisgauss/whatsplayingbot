const getUserInfo = (apiKey, username) =>
  `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`;
const getMostRecentTrack = (apiKey, username) =>
  `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&limit=1&format=json`;

export default {
  getUserInfo,
  getMostRecentTrack,
};

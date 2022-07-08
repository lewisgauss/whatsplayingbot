export interface IEnvironment {
  readonly telegramBotToken: string;
  readonly lastFmApiKey: string;
  readonly lastFmSecretKey: string;
  readonly nodeEnv: string;
  readonly herokuUrl: string;
  readonly port: number;
  readonly host: string;
  readonly groupChatIds: string;
  readonly redisTlsUrl: string;
}

declare module 'redis' {
  type IRedisClient = ReturnType<typeof createClient>;
}

interface IUserRegistrationInfo {
  unixtime: string;
}

interface IImage {
  size: string;
  '#text': string;
}

export interface IUser {
  playlists: number;
  playcount: number;
  gender: string;
  name: string;
  subscriber: number;
  url: string;
  country: string;
  image: IImage[];
  registered: IUserRegistrationInfo;
  type: string;
  age: number;
  bootstrap: number;
  realname: string;
}

export interface IGetUserInfo {
  user: IUser;
}

interface IGetRecentTrackAttribute {
  page: number;
  total: number;
  user: string;
  perPage: number;
  totalPages: number;
}

interface IArtist {
  mbid: string;
  '#text': string;
}

interface ITrackAttribute {
  nowplaying: boolean;
}

interface IAlbum {
  mbid: string;
  '#text': string;
}

interface IDate {
  uts: string;
  '#text': string;
}

export interface ITrack {
  artist: IArtist;
  '@attr': ITrackAttribute;
  album: IAlbum;
  image: IImage[];
  streamable: string;
  date: IDate;
  url: string;
  name: string;
  mbid: string;
}

interface IRecentTracks {
  '@attr': IGetRecentTrackAttribute;
  track: ITrack[];
}

export interface IGetRecentTracks {
  recenttracks: IRecentTracks;
}

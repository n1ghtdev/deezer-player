export enum types {
  PLAYLIST_REQUEST = '@@playlist/request',
  PLAYLIST_SUCCESS = '@@playlist/success',
  PLAYLIST_FAILURE = '@@playlist/failure',
  PREV_SONG = '@@playlist/prev-song',
  NEXT_SONG = '@@playlist/next-song',
  // SET_SONG = '@@playlist/set-song',
}

export type Artist = {
  id: number;
  name: string;
};

export type Album = {
  cover_medium: string;
};

export type Song = {
  id: number;
  title: string;
  title_short: string;
  duration: number;
  preview: string;
  artist: Partial<Artist>;
  album: Partial<Album>;
};

export type Playlist = {
  list: Partial<Song>[];
  // current: Partial<Song>;
  loading: boolean;
  error: Error | boolean;
};

export enum types {
  PLAY = '@@player/play',
  PAUSE = '@@player/pause',
  INIT = '@@player/init',
  SET_SONG_REQUEST = '@@player/set-song-request',
  SET_SONG_SUCCESS = '@@player/set-song-success',
  CHANGE_VOLUME = '@@player/change-volume',
}

export type PlayerState = 'playing' | 'paused' | 'loading' | 'loaded';

export type Player = {
  pausedAt: number;
  state: PlayerState;
  duration: number;
  currentSong: number | null;
  volume: number;
  autoplay: boolean;
};

export type InitSongProps = Omit<Player, 'state, autoplay'>;

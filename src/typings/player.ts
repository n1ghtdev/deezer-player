export enum types {
  PLAY = '@@player/play',
  PAUSE = '@@player/pause',
  INIT = '@@player/init',
  SET_CURRENT_SONG = '@@player/set-current-song',
  SET_DURATION = '@@player/set-duration',
  CHANGE_VOLUME = '@@player/change-volume',
}

export type PlayerState = 'playing' | 'paused' | 'loading';

export type Player = {
  pausedAt: number;
  state: PlayerState;
  duration: number;
  currentSong: number | null;
  volume: number;
};

export type InitSongProps = Omit<Player, 'state'>;

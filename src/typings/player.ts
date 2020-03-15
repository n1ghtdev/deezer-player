export enum types {
  PLAY = '@@player/play',
  PAUSE = '@@player/pause',
  CHANGE_VOLUME = '@@player/change-volume',
}

export type PlayerState = 'play' | 'stop';

export type Player = {
  startedAt: number;
  pausedAt: number;
  state: PlayerState;
  duration: number;
};

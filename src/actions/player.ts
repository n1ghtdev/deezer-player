import { types, InitSongProps, PlayerState } from '@typings/player';

export function playAction({ startedAt }: { startedAt: number }) {
  return {
    type: types.PLAY,
    payload: {
      startedAt,
    },
  } as const;
}

export function pauseAction({ pausedAt }: { pausedAt: number }) {
  return {
    type: types.PAUSE,
    payload: {
      pausedAt,
    },
  } as const;
}

export function initPlayer(payload: InitSongProps) {
  return {
    type: types.INIT,
    payload,
  } as const;
}

export function setCurrentSong(songId: number, state: PlayerState = 'paused') {
  return {
    type: types.SET_CURRENT_SONG,
    payload: {
      songId,
      state,
    },
  } as const;
}

export function setCurrentSongDuration(duration: number) {
  return {
    type: types.SET_DURATION,
    payload: duration,
  } as const;
}

export function changeVolume(volume: number) {
  return {
    type: types.CHANGE_VOLUME,
    payload: volume,
  } as const;
}

export type Actions = ReturnType<
  | typeof playAction
  | typeof pauseAction
  | typeof initPlayer
  | typeof setCurrentSong
  | typeof setCurrentSongDuration
  | typeof changeVolume
>;

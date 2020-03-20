import { types, InitSongProps, PlayerState } from '@typings/player';

export function play() {
  return {
    type: types.PLAY,
  } as const;
}

export function pause({ pausedAt }: { pausedAt: number }) {
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

export function setSongRequest(songId: number) {
  return {
    type: types.SET_SONG_REQUEST,
    payload: {
      songId,
    },
  } as const;
}

export function setSongSuccess(duration: number) {
  return {
    type: types.SET_SONG_SUCCESS,
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
  | typeof play
  | typeof pause
  | typeof initPlayer
  | typeof setSongRequest
  | typeof setSongSuccess
  | typeof changeVolume
>;

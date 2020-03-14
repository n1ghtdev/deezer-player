import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '@reducers/index';
import { types } from '@typings/playlist';
import { searchByArtist } from 'src/api';

type ThunkResult = ThunkAction<void, State, unknown, Action<string>>;

export function getSongsByArtist(artist: string): ThunkResult {
  return async dispatch => {
    dispatch(getSongsRequest());

    searchByArtist(artist).then(
      (data: any) => {
        dispatch(getSongsSuccess(data.data));
      },
      (error: Error) => {
        dispatch(getSongsFailure(error));
      },
    );
  };
}

function getSongsRequest() {
  return {
    type: types.PLAYLIST_REQUEST,
  } as const;
}

export function getSongsSuccess(payload: any) {
  return {
    type: types.PLAYLIST_SUCCESS,
    payload,
  } as const;
}

export function getSongsFailure(error: Error) {
  return {
    type: types.PLAYLIST_FAILURE,
    error,
  } as const;
}

export type Actions = ReturnType<
  typeof getSongsRequest | typeof getSongsSuccess | typeof getSongsFailure
>;
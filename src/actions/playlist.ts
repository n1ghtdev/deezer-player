import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { State } from '@reducers/index';
import { types } from '@typings/playlist';
import { searchByArtist } from '../api';
import { setCurrentSong } from './player';

type ThunkResult = ThunkAction<void, State, unknown, Action<string>>;

export function getSongsByArtist(artist: string): ThunkResult {
  return async dispatch => {
    dispatch(getSongsRequest());

    searchByArtist(artist).then(
      (data: any) => {
        console.log(data.data);

        dispatch(getSongsSuccess(data.data));
        dispatch(setCurrentSong(data.data[0].id));
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

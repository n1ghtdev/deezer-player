import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { State } from '@reducers/index';
import { types } from '@typings/playlist';

import { searchByArtist } from '../api';
import { setSongRequest, pause } from './player';

type ThunkResult = ThunkAction<void, State, unknown, Action<string>>;

export function getSongsByArtist(artist: string): ThunkResult {
  return async dispatch => {
    dispatch(getSongsRequest());

    searchByArtist(artist).then(
      (response: any) => {
        if (response.data.total !== 0) {
          dispatch(getSongsSuccess(response.data));

          // pause to prevent from autoplaying
          dispatch(pause({ pausedAt: 0 }));
          dispatch(setSongRequest(response.data[0].id));
        }
      },
      (error: Error) => {
        dispatch(getSongsFailure(error));
      }
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

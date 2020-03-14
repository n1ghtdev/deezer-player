import produce from 'immer';
import { Playlist, types } from '@typings/playlist';
import { Actions } from '@actions/playlist';

const initialState: Playlist = {
  list: [],
  current: {},
  loading: false,
  error: false,
};

export default function playlistReducer(
  state: Playlist = initialState,
  action: Actions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case types.PLAYLIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.PLAYLIST_SUCCESS: {
        draft.list = action.payload;
        draft.current = action.payload[0];
        draft.loading = false;
        draft.error = false;
        break;
      }
      case types.PLAYLIST_FAILURE: {
        draft.loading = false;
        draft.error = action.error;
      }
    }
  });
}

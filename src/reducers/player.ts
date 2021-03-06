import produce from 'immer';
import { Player, types } from '@typings/player';
import { Actions } from '@actions/player';

const initialState: Player = {
  pausedAt: 0,
  state: 'loading',
  duration: 0,
  currentSong: null,
  volume: 50,
  autoplay: false,
};

export default function playerReducer(
  state: Player = initialState,
  action: Actions
) {
  const prevPlayerState = state.state;

  return produce(state, draft => {
    switch (action.type) {
      case types.PLAY: {
        draft.state = 'playing';
        break;
      }
      case types.PAUSE: {
        draft.pausedAt = action.payload.pausedAt;
        draft.state = 'paused';
        break;
      }
      case types.INIT: {
        draft.state = 'loading';
        draft.currentSong = action.payload.currentSong;
        draft.pausedAt = action.payload.pausedAt;
        draft.duration = action.payload.duration;
        break;
      }
      case types.SET_SONG_REQUEST: {
        if (prevPlayerState === 'playing') {
          draft.autoplay = true;
        }

        draft.pausedAt = 0;
        draft.currentSong = action.payload.songId;
        draft.state = 'loading';
        break;
      }
      case types.SET_SONG_SUCCESS: {
        draft.duration = action.payload;
        draft.state = state.autoplay ? 'playing' : 'loaded';
        break;
      }
      case types.CHANGE_VOLUME: {
        draft.volume = action.payload;
        break;
      }
    }
  });
}

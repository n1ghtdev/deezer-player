import produce from 'immer';
import { Player, types } from '@typings/player';
import { Actions } from '@actions/player';

const initialState: Player = {
  startedAt: 0,
  pausedAt: 0,
  status: 'stop',
  duration: 0,
};

export default function playerReducer(
  state: Player = initialState,
  action: Actions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case types.PLAY: {
        draft.startedAt = action.payload.startedAt;
        draft.duration = action.payload.duration;
        draft.status = 'play';
        break;
      }
      case types.PAUSE: {
        draft.pausedAt = action.payload.pausedAt;
        draft.status = 'stop';
        break;
      }
    }
  });
}

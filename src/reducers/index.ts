import { combineReducers } from 'redux';
import playlistReducer from './playlist';
import playerReducer from './player';

const reducers = combineReducers({
  playlist: playlistReducer,
  player: playerReducer,
});

export type State = ReturnType<typeof reducers>;
export default reducers;

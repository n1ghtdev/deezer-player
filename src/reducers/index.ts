import { combineReducers } from 'redux';
import playlistReducer from './playlist';

const reducers = combineReducers({
  playlist: playlistReducer,
});

export type State = ReturnType<typeof reducers>;
export default reducers;

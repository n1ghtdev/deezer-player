import { State } from '@reducers/index';
import { Song } from '@typings/playlist';

export function getSong(state: State) {
  if (!state.playlist.list || !state.player) {
    return;
  }
  return state.playlist.list.find(
    (song: Song) => song.id === state.player.currentSong,
  );
}

import { State } from '@reducers/index';
import { Song } from '@typings/playlist';

export function getPrevSong(state: State) {
  const currentSongId = state.player.currentSong;

  if (!currentSongId) {
    return;
  }

  const currentSongIndex = state.playlist.list.findIndex(
    (song: Song) => song.id === currentSongId,
  );

  if (currentSongIndex === 0) {
    const lastIndex = state.playlist.list.length - 1;
    return state.playlist.list[lastIndex].id;
  } else if (currentSongIndex === -1) {
    return;
  }

  return state.playlist.list[currentSongIndex - 1].id;
}

export function getNextSong(state: State) {
  const currentSongId = state.player.currentSong;

  if (!currentSongId) {
    return;
  }

  const currentSongIndex = state.playlist.list.findIndex(
    (song: Song) => song.id === currentSongId,
  );
  const lastIndex = state.playlist.list.length - 1;

  if (currentSongIndex === lastIndex) {
    return state.playlist.list[0].id;
  } else if (currentSongIndex === -1) {
    return;
  }

  return state.playlist.list[currentSongIndex + 1].id;
}

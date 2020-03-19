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
  }

  return state.playlist.list[currentSongIndex - 1]?.id;
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
    if (state.playlist.list[0]) {
      return state.playlist.list[0].id;
    }
  }

  return state.playlist.list[currentSongIndex + 1]?.id;
}

export function getCurrentSongDuration(state: State) {
  const currentSong = state.playlist.list.find(
    (song: Song) => song.id === state.player.currentSong,
  );

  if (currentSong) {
    return currentSong.duration;
  }
  return 0;
}

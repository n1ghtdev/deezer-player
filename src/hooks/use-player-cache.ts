import React from 'react';
import { Player } from '@typings/player';
import { Playlist } from '@typings/playlist';
import { useDispatch } from 'react-redux';
import { getSongsSuccess } from '@actions/playlist';
import { initPlayer } from '@actions/player';

export default function usePlayerCache() {
  const dispatch = useDispatch();

  const loadCache = React.useCallback(() => {
    try {
      const cache = localStorage.getItem('audio-player');
      const { playlist, player } = JSON.parse(cache);

      dispatch(getSongsSuccess(playlist));
      dispatch(initPlayer(player));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const saveCache = React.useCallback((playlist: Playlist, player: Player) => {
    if (!playlist.list || !player.currentSong) {
      return;
    }

    try {
      localStorage.setItem(
        'audio-player',
        JSON.stringify({ playlist: playlist.list, player }),
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    loadCache,
    saveCache,
  };
}

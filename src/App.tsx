import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSongsByArtist } from '@actions/playlist';
import { State } from '@reducers/index';
import { getSong } from '@selectors/player';
import { configureIcons } from '@utils/configure-icons';
import usePlayerCache from '@hooks/use-player-cache';

import Container from '@components/container';
import Layout from '@components/layout';
import Header from '@components/header';
import SearchBar from '@components/search-bar';
import SongList from '@components/song-list';
import Player from '@components/player';

configureIcons();

export default function App() {
  const playlist = useSelector((state: State) => state.playlist);
  const player = useSelector((state: State) => state.player);
  const currentSong = useSelector(getSong);

  const dispatch = useDispatch();
  const { loadCache, saveCache } = usePlayerCache();

  React.useEffect(() => {
    loadCache();
  }, [loadCache]);

  React.useEffect(() => {
    saveCache(playlist, player);
  }, [playlist, player, saveCache]);

  function handleSearchSubmit(artist: string) {
    dispatch(getSongsByArtist(artist));
  }

  return (
    <Container>
      <Header
        title="Visage"
        searchBar={<SearchBar onSubmit={handleSearchSubmit} />}
      />

      <Layout
        content={<Player song={currentSong} />}
        aside={
          <SongList songlist={playlist.list} currentSong={currentSong?.id} />
        }
      />
    </Container>
  );
}

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@components/container';
import Layout from '@components/layout';
import Header from '@components/header';
import SearchBar from '@components/search-bar';
import SongList from '@components/song-list';
import { getSongsByArtist, getSongsSuccess } from '@actions/playlist';
import { State } from '@reducers/index';
import Player from '@components/player';
import { getSong } from '@selectors/player';
import { initPlayer } from '@actions/player';
import { configureIcons } from '@utils/configure-icons';

configureIcons();

export default function App() {
  const playlist = useSelector((state: State) => state.playlist);
  const player = useSelector((state: State) => state.player);
  const currentSong = useSelector(getSong);

  const dispatch = useDispatch();

  // TODO: move cache logic to custom hook
  React.useEffect(() => {
    try {
      const cache = localStorage.getItem('audio-player');
      const { playlist, player } = JSON.parse(cache);
      dispatch(getSongsSuccess(playlist));
      dispatch(initPlayer(player));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  React.useEffect(() => {
    function saveToLocalStorate() {
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
        // throw err;
      }
    }
    saveToLocalStorate();
  }, [playlist, player]);

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

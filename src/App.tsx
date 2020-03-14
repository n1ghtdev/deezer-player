import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@components/container';
import Layout from '@components/layout';
import Header from '@components/header';
import SearchBar from '@components/search-bar';
import SongList from '@components/song-list';
import { getSongsByArtist } from '@actions/playlist';
import { State } from '@reducers/index';

export default function App() {
  const playlist = useSelector((state: State) => state.playlist);
  const dispatch = useDispatch();

  function handleSearchSubmit(artist: string) {
    dispatch(getSongsByArtist(artist));
  }

  return (
    <Container>
      <Header>
        <h1>VISAGE</h1>
        <SearchBar onSubmit={handleSearchSubmit} />
      </Header>
      <Layout
        content={<div>content</div>}
        aside={
          <SongList
            songlist={playlist.list}
            currentSong={playlist.current.id}
          />
        }
      />
    </Container>
  );
}

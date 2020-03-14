import React from 'react';
import Container from '@components/container';
import Layout from '@components/layout';
import Header from '@components/header';
import SearchBar from '@components/search-bar';

export default function App() {
  function handleSearchSubmit(artist: string) {
    console.log(artist);
  }
  return (
    <Container>
      <Header>
        <h1>VISAGE</h1>
        <SearchBar onSubmit={handleSearchSubmit} />
      </Header>
      <Layout content={<div>content</div>} aside={<div>aside</div>} />
    </Container>
  );
}

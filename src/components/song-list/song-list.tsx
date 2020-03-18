import React from 'react';
import { Song } from '@typings/playlist';
import SongItem from './song-item';

import './song-list.scss';

type Props = {
  songlist: any;
  currentSong?: number;
};

export default function SongList(props: Props) {
  const { songlist, currentSong } = props;

  return (
    <div className="song-list">
      {songlist.length > 0 ? (
        songlist.map((song: Song, index: number) => (
          <SongItem
            id={song.id}
            index={index + 1}
            title={song.title_short}
            duration={song.duration}
            active={song.id === currentSong}
            onChangeSong={(id: number) => {
              console.log(id);
            }}
          />
        ))
      ) : (
        <div style={{ padding: '25px' }}>No songs found</div>
      )}
    </div>
  );
}

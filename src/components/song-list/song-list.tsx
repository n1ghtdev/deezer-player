import React from 'react';
import { Song } from '@typings/playlist';
import SongItem from './song-item';

import './song-list.scss';
import { setCurrentSong } from '@actions/player';
import { useDispatch } from 'react-redux';

type Props = {
  songlist: any;
  currentSong?: number;
};

export default function SongList(props: Props) {
  const { songlist, currentSong } = props;
  const dispatch = useDispatch();

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
              dispatch(setCurrentSong(id, 'playing'));
            }}
          />
        ))
      ) : (
        <div style={{ padding: '25px' }}>No songs found</div>
      )}
    </div>
  );
}

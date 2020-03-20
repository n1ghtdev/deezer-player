import React from 'react';
import { useDispatch } from 'react-redux';

import { Song } from '@typings/playlist';
import { setSongRequest } from '@actions/player';

import SongItem from './song-item';

import './song-list.scss';

type Props = {
  songlist: any;
  currentSong?: number;
};

export default function SongList({ songlist, currentSong }: Props) {
  const dispatch = useDispatch();

  const handleChangeSong = React.useCallback(
    (id: number) => {
      dispatch(setSongRequest(id));
    },
    [dispatch]
  );

  return (
    <div className="song-list">
      {songlist.length > 0 ? (
        songlist.map((song: Song, index: number) => (
          <SongItem
            id={song.id}
            key={song.id}
            index={index + 1}
            title={song.title_short}
            duration={song.duration}
            active={song.id === currentSong}
            onChangeSong={handleChangeSong}
          />
        ))
      ) : (
        <div style={{ padding: '25px' }}>No songs found</div>
      )}
    </div>
  );
}

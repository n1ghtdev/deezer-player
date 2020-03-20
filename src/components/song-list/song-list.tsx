import React from 'react';
import { Song } from '@typings/playlist';
import SongItem from './song-item';
import { setSongRequest } from '@actions/player';
import { useDispatch } from 'react-redux';

import './song-list.scss';

type Props = {
  songlist: any;
  currentSong?: number;
};

export default function SongList(props: Props) {
  const { songlist, currentSong } = props;
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

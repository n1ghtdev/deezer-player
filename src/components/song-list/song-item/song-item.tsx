import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '@reducers/index';
import { formatSeconds } from '@utils/format-seconds';

import IconPlaying from './icon-playing';

import './song-item.scss';

type Props = {
  title: string;
  duration: number;
  index: number;
  id: number;
  active: boolean;
  onChangeSong: (id: number) => void;
};

export default function SongItem(props: Props) {
  const { title, duration, index, id, active, onChangeSong } = props;

  const isPlaying = useSelector(
    (state: State) => state.player.state === 'playing'
  );

  function handleChangeSong() {
    if (active) {
      return;
    }
    onChangeSong(id);
  }
  return (
    <div
      className={`song-item ${active ? 'active' : ''}`}
      onClick={handleChangeSong}
    >
      <span className="song-item_number">
        {active ? <IconPlaying playing={isPlaying} /> : index}
      </span>
      <span className="song-item_name">{title}</span>
      <span className="song-item_duration">{formatSeconds(duration)}</span>
    </div>
  );
}

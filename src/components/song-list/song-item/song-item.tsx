import React from 'react';
import './song-item.scss';
import { formatSeconds } from '@utils/format-seconds';
import IconPlaying from '@assets/svg/playing.svg';

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
        {active ? <img src={IconPlaying} alt="" /> : index}
      </span>
      <span className="song-item_name">{title}</span>
      <span className="song-item_duration">{formatSeconds(duration)}</span>
    </div>
  );
}

import React from 'react';
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

  function handleChangeSong() {
    if (active) {
      return;
    }
    onChangeSong(id);
  }
  return (
    // TODO: button
    <div
      className={`song-item ${active ? 'active' : ''}`}
      onClick={handleChangeSong}
    >
      <div className="song-item_number">{index}</div>
      <h3 className="song-item_name">{title}</h3>
      <span className="song-item_duration">{duration}</span>
    </div>
  );
}

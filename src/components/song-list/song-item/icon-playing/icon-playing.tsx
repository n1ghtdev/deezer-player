import React from 'react';

import './icon-playing.scss';

type Props = {
  playing: boolean;
};

export default function IconPlaying({ playing }: Props) {
  return (
    <svg
      className={`icon-playing ${playing ? 'active' : ''}`}
      viewBox="0 0 18 17"
      width="18"
      height="17"
    >
      <rect
        className="icon-playing_bar icon-playing_bar-1"
        width={3}
        height={9}
        x={1}
        y={8}
      />
      <rect
        className="icon-playing_bar icon-playing_bar-2"
        width={3}
        height={14}
        x={5}
        y={3}
      />
      <rect
        className="icon-playing_bar icon-playing_bar-3"
        width={3}
        height={10}
        x={9}
        y={7}
      />
      <rect
        className="icon-playing_bar icon-playing_bar-4"
        width={3}
        height={6}
        x={13}
        y={11}
      />
    </svg>
  );
}

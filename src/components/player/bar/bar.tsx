import React, { MutableRefObject } from 'react';

import './bar.scss';

type Props = {
  progressBarRef: MutableRefObject<HTMLCanvasElement>;
  children: React.ReactNode;
};

export default function Bar({ progressBarRef, children }: Props) {
  return (
    <div className="player-bar">
      <canvas
        height={0}
        ref={progressBarRef}
        className="player-bar_progressbar"
      ></canvas>
      <div className="player-bar_content">{children}</div>
    </div>
  );
}

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './controls.scss';

type Props = {
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  isPlaying: boolean;
};

export default function Controls(props: Props) {
  const { onPlay, onPause, onPrev, onNext, isPlaying } = props;

  return (
    <div className="controls">
      <button className="controls_button" onClick={onPrev}>
        <FontAwesomeIcon icon="backward" />
      </button>
      {isPlaying ? (
        <button className="controls_button" onClick={onPause}>
          <FontAwesomeIcon icon="pause" />
        </button>
      ) : (
        <button className="controls_button" onClick={onPlay}>
          <FontAwesomeIcon icon="play" />
        </button>
      )}
      <button className="controls_button" onClick={onNext}>
        <FontAwesomeIcon icon="forward" />
      </button>
    </div>
  );
}

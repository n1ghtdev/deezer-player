import React from 'react';

import './time.scss';
import { PlayerState } from '@typings/player';
import { formatSeconds } from '@utils/format-seconds';

type Props = {
  getCurrentTime: number;
  duration: number;
  playerState: PlayerState;
};

export default function Time(props: Props) {
  const { getCurrentTime, duration, playerState } = props;
  const raf = React.useRef(null);
  const [currentTime, setCurrentTime] = React.useState(0);

  // TODO: raf cleanup
  React.useEffect(() => {
    let then = 0;

    function loop() {
      raf.current = requestAnimationFrame(loop);

      let now = Date.now();
      let elapsed = now - then;

      if (elapsed > 200) {
        then = now - (elapsed % 200);
        setCurrentTime(Math.round(getCurrentTime()));
      }
    }
    if (playerState === 'playing') {
      then = Date.now();
      loop();
    }
  }, [playerState, getCurrentTime]);

  return (
    <div className="player_time">
      <div className="player_time-current">{formatSeconds(currentTime)}</div>
      <div className="player_time-duration">{formatSeconds(duration)}</div>
    </div>
  );
}

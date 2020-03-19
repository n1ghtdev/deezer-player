import React from 'react';

import './time.scss';
import { formatSeconds } from '@utils/format-seconds';
import { useSelector } from 'react-redux';
import { State } from '@reducers/';

type Props = {
  getCurrentTime: number;
};

export default function Time(props: Props) {
  const { getCurrentTime } = props;
  const raf = React.useRef(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const player = useSelector((state: State) => state.player);

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
    if (player.state === 'playing') {
      then = Date.now();
      loop();
    } else if (player.state === 'paused') {
      setCurrentTime(Math.round(player.pausedAt));
    }
  }, [player.state, player.pausedAt, getCurrentTime]);

  return (
    <div className="player_time">
      <div className="player_time-current">{formatSeconds(currentTime)}</div>
      <div className="player_time-duration">
        {formatSeconds(player.duration)}
      </div>
    </div>
  );
}

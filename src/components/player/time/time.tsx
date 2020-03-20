import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '@reducers/index';
import { formatSeconds } from '@utils/format-seconds';

import './time.scss';

type Props = {
  getCurrentTime: () => number;
};

export default function Time(props: Props) {
  const { getCurrentTime } = props;

  const player = useSelector((state: State) => state.player);
  const [currentTime, setCurrentTime] = React.useState(0);
  const raf = React.useRef(null);

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

    if (player.state !== 'loading') {
      then = Date.now();
      loop();
    }
    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
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

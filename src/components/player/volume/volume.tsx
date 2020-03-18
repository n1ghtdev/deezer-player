import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './volume.scss';

type Props = {
  onVolumeChange: (volume: number) => void;
  volume: number;
};

export default function Volume(props: Props) {
  const [prevVolume, setPrevVolume] = React.useState(0);

  const icons = {
    '100': 'volume-up',
    '50': 'volume-down',
    '25': 'volume-off',
    '0': 'volume-mute',
  };
  function getIconByVolume(volume: string): string {
    return icons[Object.keys(icons).find((key: string) => key >= volume)];
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    props.onVolumeChange(Number(target.value));
  }
  return (
    <div className="volume">
      <FontAwesomeIcon
        onClick={() => {
          if (props.volume !== 0) {
            setPrevVolume(props.volume);
            props.onVolumeChange(0);
          } else {
            props.onVolumeChange(prevVolume);
          }
        }}
        className="volume_icon"
        icon={getIconByVolume(props.volume)}
      />
      <input
        className="volume_slider"
        type="range"
        value={props.volume}
        onChange={handleVolumeChange}
        min={0}
        max={100}
      />
    </div>
  );
}

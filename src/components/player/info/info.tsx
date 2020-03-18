import React from 'react';

import './info.scss';

type Props = {
  poster: string;
  title: string;
  artist: string;
};

export default function Info(props: Props) {
  return (
    <div className="info">
      <img
        className="info_poster"
        src={props.poster}
        alt={`${props.artist} - ${props.title}`}
      />
      <div className="info_header">
        <h2 className="info_title">{props.title}</h2>
        <h3 className="info_artist">{props.artist}</h3>
      </div>
    </div>
  );
}

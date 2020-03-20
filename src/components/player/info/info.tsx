import React from 'react';

import './info.scss';

type Props = {
  poster: string;
  title: string;
  artist: string;
};

export default function Info(props: Props) {
  const { poster, title, artist } = props;

  return (
    <div className="info">
      <img className="info_poster" src={poster} alt={`${artist} - ${title}`} />
      <div className="info_header">
        <h2 className="info_title">{title}</h2>
        <h3 className="info_artist">{artist}</h3>
      </div>
    </div>
  );
}

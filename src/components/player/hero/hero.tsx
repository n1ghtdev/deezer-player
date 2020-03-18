import React from 'react';

import './hero.scss';

type Props = {
  posterSrc: string;
  posterAlt: string;
  children: React.ReactNode;
};

export default function Hero(props: Props) {
  const { posterSrc, posterAlt, children } = props;
  return (
    <div className="player_hero">
      <img className="player_poster" src={posterSrc} alt={posterAlt} />
      <div className="player_hero-content">{children}</div>
    </div>
  );
}

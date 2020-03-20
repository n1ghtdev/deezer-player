import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Song } from '@typings/playlist';
import { State } from '@reducers/index';
import { getPrevSong, getNextSong } from '@selectors/playlist';
import { changeVolume, play, pause, setSongRequest } from '@actions/player';
import usePlayer from '@hooks/use-player';

import Visualizer from './visualizer';
import Controls from './controls';
import Info from './info';
import Volume from './volume';
import Hero from './hero';
import Time from './time';
import Bar from './bar';

import './player.scss';

type Props = {
  song: Partial<Song>;
};

export default function Player({ song }: Props) {
  const visualizerRef = React.useRef<HTMLCanvasElement>(null);
  const progressBarRef = React.useRef<HTMLCanvasElement>(null);

  const { getCurrentTime } = usePlayer(
    song?.preview,
    visualizerRef,
    progressBarRef
  );

  const dispatch = useDispatch();
  const player = useSelector((state: State) => state.player);
  const prevSongId = useSelector(getPrevSong);
  const nextSongId = useSelector(getNextSong);

  const onPlay = React.useCallback(() => {
    dispatch(play());
  }, [dispatch]);

  const onPause = React.useCallback(() => {
    dispatch(pause({ pausedAt: getCurrentTime() }));
  }, [dispatch, getCurrentTime]);

  const onPrevSong = React.useCallback(() => {
    dispatch(setSongRequest(prevSongId));
  }, [dispatch, prevSongId]);

  const onNextSong = React.useCallback(() => {
    dispatch(setSongRequest(nextSongId));
  }, [dispatch, nextSongId]);

  const onVolumeChange = React.useCallback(
    (volume: number) => {
      dispatch(changeVolume(volume));
    },
    [dispatch]
  );

  if (!song) {
    return <div className="player"></div>;
  }

  return (
    <div className="player">
      <Hero posterSrc={song.album.cover_medium} posterAlt={song.title}>
        <Time getCurrentTime={() => getCurrentTime()} />
        <Visualizer canvasRef={visualizerRef} />
      </Hero>
      <Bar progressBarRef={progressBarRef}>
        <Controls
          onPlay={onPlay}
          onPause={onPause}
          onPrev={onPrevSong}
          onNext={onNextSong}
          isPlaying={player.state === 'playing'}
        />
        <Info
          poster={song.album.cover_medium}
          title={song.title}
          artist={song.artist.name}
        />
        <Volume onVolumeChange={onVolumeChange} volume={player.volume} />
      </Bar>
    </div>
  );
}

import React from 'react';
import { Song } from '@typings/playlist';
import usePlayer from '@hooks/use-player';
import Visualizer from './visualizer';
import Controls from './controls';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@reducers/index';
import { getPrevSong, getNextSong } from '@selectors/playlist';
import {
  setCurrentSong,
  changeVolume,
  playAction,
  pauseAction,
} from '@actions/player';
import Info from './info';
import Volume from './volume';
import Hero from './hero';
import Time from './time';

import './player.scss';

type Props = {
  song: Partial<Song>;
};

export default function Player(props: Props) {
  const { song } = props;

  const canvas = React.useRef<HTMLCanvasElement>(null);
  const { getCurrentTime } = usePlayer(song?.preview, canvas);

  const dispatch = useDispatch();
  const player = useSelector((state: State) => state.player);
  const prevSongId = useSelector(getPrevSong);
  const nextSongId = useSelector(getNextSong);

  const onPlay = React.useCallback(() => {
    dispatch(playAction({ startedAt: getCurrentTime() }));
  }, [dispatch, getCurrentTime]);

  const onPause = React.useCallback(() => {
    dispatch(pauseAction({ pausedAt: getCurrentTime() }));
  }, [dispatch, getCurrentTime]);

  const onPrevSong = React.useCallback(() => {
    dispatch(setCurrentSong(prevSongId, 'playing'));
  }, [dispatch, prevSongId]);

  const onNextSong = React.useCallback(() => {
    dispatch(setCurrentSong(nextSongId, 'playing'));
  }, [dispatch, nextSongId]);

  const onVolumeChange = React.useCallback(
    (volume: number) => {
      dispatch(changeVolume(volume));
    },
    [dispatch],
  );

  if (!song) {
    return <div className="player"></div>;
  }

  return (
    <div className="player">
      <Hero posterSrc={song.album.cover_medium} alt={song.title}>
        <Time
          playerState={player.state}
          getCurrentTime={() => getCurrentTime()}
          duration={player.duration}
        />
        <Visualizer canvasRef={canvas} />
      </Hero>
      <div className="player_bar">
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
      </div>
    </div>
  );
}

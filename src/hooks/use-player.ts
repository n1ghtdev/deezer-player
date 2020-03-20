import React, { MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongRequest, setSongSuccess } from '@actions/player';
import { State } from '@reducers/index';
import { getNextSong } from '@selectors/playlist';
import { createPlayer } from '@utils/player-utils';

type PlayerProps = {
  songUrl: string;
  visualizerRef: MutableRefObject<HTMLCanvasElement>;
  progressBarRef: MutableRefObject<HTMLCanvasElement>;
};

export default function usePlayer<PlayerProps>(
  songUrl,
  visualizerRef,
  progressBarRef
) {
  const dispatch = useDispatch();
  const player = useSelector((state: State) => state.player);
  const nextSongId = useSelector(getNextSong);

  const Player = React.useRef(createPlayer());

  const then = React.useRef(0);
  const raf = React.useRef(null);
  const delay = React.useRef(1000 / 20);

  React.useEffect(() => {
    if (!songUrl) {
      return;
    }

    function handleAudioEnded() {
      dispatch(setSongRequest(nextSongId));
    }

    function handleMetaData() {
      if (player.pausedAt !== 0 && Player.current.audio.paused) {
        Player.current.setPlayback(player.pausedAt);
        // Player.current.drawFrame(true);
      }
      dispatch(setSongSuccess(Math.round(Player.current.getDuration())));
    }

    const audio = Player.current.audio;
    const cleanup = Player.current.setSong(songUrl);
    audio.addEventListener('ended', handleAudioEnded);
    audio.addEventListener('loadedmetadata', handleMetaData);

    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
      cleanup();
      audio.removeEventListener('ended', handleAudioEnded);
      audio.removeEventListener('loadedmetadata', handleMetaData);
    };
  }, [songUrl, dispatch, nextSongId, player.pausedAt]);

  React.useLayoutEffect(() => {
    const visualizer = visualizerRef.current;
    const progressBar = progressBarRef.current;

    if (!visualizer || !progressBar || player.state === 'loading') {
      return;
    }

    const cleanup = Player.current.drawCanvas(
      visualizer,
      progressBar,
      player.state === 'loaded'
    );

    return () => cleanup;
  }, [visualizerRef, progressBarRef, player.state, songUrl]);

  React.useEffect(() => {
    Player.current.changeVolume(player.volume / 100);
  }, [player.volume]);

  const play = React.useCallback(() => {
    function renderLoop() {
      raf.current = requestAnimationFrame(renderLoop);

      let now = Date.now();
      let elapsed = now - then.current;

      if (elapsed > delay.current) {
        then.current = now - (elapsed % delay.current);
        Player.current.drawFrame(visualizerRef.current, progressBarRef.current);
      }
    }

    Player.current.play();
    then.current = Date.now();
    renderLoop();
  }, [progressBarRef, visualizerRef]);

  const pause = React.useCallback(() => {
    cancelAnimationFrame(raf.current);
    Player.current.pause();
  }, []);

  React.useEffect(() => {
    if (player.state === 'paused') {
      pause();
    } else if (player.state === 'playing') {
      play();
    }
  }, [player.state, dispatch, play, pause, songUrl]);

  function getCurrentTime() {
    return Player.current.getPlayback();
  }

  return {
    getCurrentTime,
  };
}

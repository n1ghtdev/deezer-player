import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from '@actions/player';
import { State } from '@reducers/index';
import { getNextSong } from '@selectors/playlist';
import { createPlayer } from '@utils/player-utils';

export default function usePlayer(songUrl: string, canvas: HTMLCanvasElement) {
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

    const audio = Player.current.audio;

    function handleAudioEnded() {
      dispatch(setCurrentSong(nextSongId, 'playing'));
    }

    const cleanup = Player.current.setSong(songUrl);
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      then.current = 0;
      raf.current = null;
      cleanup();
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [songUrl, dispatch, nextSongId]);

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
        Player.current.drawFrame();
      }
    }

    Player.current.play();
    then.current = Date.now();
    renderLoop();
  }, []);

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

  React.useLayoutEffect(() => {
    const cleanup = Player.current.drawCanvas(canvas.current);
    return cleanup;
  }, [canvas, songUrl]);

  function getCurrentTime() {
    return Player.current.audio.currentTime;
  }

  return {
    getCurrentTime,
  };
}

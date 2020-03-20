function createAudioContext() {
  (AudioContext as any) =
    (window as any).AudioContext || (window as any).webkitAudioContext;
  const context = new AudioContext();
  const analyser = context.createAnalyser();

  return { context, analyser };
}

function createRandomUint8Array(length: number): Uint8Array {
  const array = new Uint8Array(length);

  return array.map(
    (num: number) => Math.floor(Math.random() * (200 - 75 + 1)) + 50
  );
}

export function createPlayer() {
  const { analyser, context } = createAudioContext();
  const audio = new Audio();
  const source = context.createMediaElementSource(audio);

  let canvas: HTMLCanvasElement = null;
  let dataArray: Uint8Array;
  let bufferLength: number;

  analyser.fftSize = 1024;

  function setSong(songUrl: string) {
    audio.preload = 'metadata';
    audio.src = songUrl;
    audio.crossOrigin = 'anonymous';
    source.connect(analyser);
    analyser.connect(context.destination);

    // return cleanup function for useEffect cleanup
    return () => {
      analyser.disconnect();
    };
  }

  function play() {
    if (context.state === 'suspended') {
      context.resume().then(() => {
        console.log('Audio Context resumed');
      });
    }

    if (audio.src) {
      audio.play();
    }
  }

  function pause() {
    if (!audio.paused && audio.src) {
      audio.pause();
    }
  }

  function changeVolume(volume: number) {
    audio.volume = volume;
  }

  function setPlayback(time: number) {
    audio.currentTime = time;
  }

  function getPlayback(): number {
    if (audio.src) {
      return audio.currentTime;
    }
  }

  function getDuration(): number {
    if (audio.src) {
      return audio.duration;
    }
  }

  function drawCanvas(
    visualizerCanvas: HTMLCanvasElement,
    progressBarCanvas: HTMLCanvasElement,
    isFirstRender: boolean
  ) {
    if (visualizerCanvas && progressBarCanvas) {
      function resizeEventHandler(e: UIEvent) {
        visualizer.width = visualizer.offsetWidth;
        Player.current.drawCanvas(visualizer, progressBar);
      }

      function clickPlaybackHandler(e: MouseEvent, canvas: HTMLCanvasElement) {
        const canvasRect = canvas.getBoundingClientRect();
        const x = e.clientX - canvasRect.left;
        const prevPlayback = getPlayback();
        const duration = getDuration();

        setPlayback((x / canvas.width) * duration);

        if (prevPlayback === 0 && audio.paused) {
          drawVisualizerFrame(visualizerCanvas, true);
          drawProgressBarFrame(progressBarCanvas);
        } else {
          drawVisualizerFrame(visualizerCanvas);
          drawProgressBarFrame(progressBarCanvas);
        }
      }

      window.addEventListener('resize', resizeEventHandler);
      visualizerCanvas.addEventListener('click', (e: MouseEvent) =>
        clickPlaybackHandler(e, visualizerCanvas)
      );
      progressBarCanvas.addEventListener('click', (e: MouseEvent) =>
        clickPlaybackHandler(e, progressBarCanvas)
      );

      drawVisualizer(visualizerCanvas);
      drawProgressBar(progressBarCanvas);
      drawFrame(visualizerCanvas, progressBarCanvas, isFirstRender);

      return () => {
        window.removeEventListener('resize', resizeEventHandler);
        visualizerCanvas.removeEventListener(
          'click',
          visualizerPlaybackHandler
        );
        progressBarCanvas.removeEventListener(
          'click',
          progressBarPlaybackHandler
        );
      };
    }
  }

  function drawFrame(
    visualizerCanvas: HTMLCanvasElement,
    progressBarCanvas: HTMLCanvasElement,
    staticRender: boolean = false
  ) {
    if (visualizerCanvas && progressBarCanvas) {
      drawVisualizerFrame(visualizerCanvas, staticRender);
      drawProgressBarFrame(progressBarCanvas);
    }
  }

  function drawVisualizer(canvas: HTMLCanvasElement) {
    const canvasCtx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = 90;

    bufferLength = Math.round(canvas.width / 3);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawVisualizerFrame(
    canvas: HTMLCanvasElement,
    staticRender: boolean = false
  ) {
    const canvasCtx = canvas.getContext('2d')!;

    if (staticRender) {
      dataArray = createRandomUint8Array(bufferLength);
    } else if (!audio.paused) {
      dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
    }

    let x = 0;
    const barWidth = Math.round(canvas.width / bufferLength);

    canvasCtx.fillStyle = 'rgb(255,255,255)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
      let barHeight = (dataArray[i] / 255) * (canvas.height - 25);

      if ((audio.duration / bufferLength) * i < audio.currentTime) {
        canvasCtx.fillStyle = '#97a9b2';
        canvasCtx.fillRect(x, 65, 2, -barHeight);
        canvasCtx.fillStyle = '#EDF0F2';
        canvasCtx.fillRect(x, 65, 2, (dataArray[i] / 255) * 25);
      } else {
        canvasCtx.fillStyle = '#dee7eb';
        canvasCtx.fillRect(x, 65, 2, -barHeight);
      }

      x = barWidth * i;
    }
  }

  function drawProgressBar(canvas: HTMLCanvasElement) {
    canvas.width = canvas.offsetWidth;
    canvas.height = 8;
  }

  function drawProgressBarFrame(canvas: HTMLCanvasElement) {
    if (canvas) {
      const canvasCtx = canvas.getContext('2d');

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = '#EDF0F2';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#10b1dc');
      gradient.addColorStop(1, '#2dd4c7');
      canvasCtx.fillStyle = gradient;
      const actualWidth =
        (audio.currentTime / audio.duration) * canvas.width || 0;

      canvasCtx.fillRect(0, 0, actualWidth, canvas.height);
    }
  }

  return {
    audio,
    setSong,
    play,
    pause,
    setPlayback,
    getPlayback,
    getDuration,
    changeVolume,
    drawCanvas,
    drawFrame,
  };
}

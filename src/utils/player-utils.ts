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
  let contextAllowed = false;
  const audio = new Audio();
  const source = context.createMediaElementSource(audio);
  let canvas: HTMLCanvasElement = null;
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
    context.resume().then(() => {
      console.log('Audio Context resumed');
    });

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

  function drawCanvas(canvasEl: HTMLCanvasElement) {
    if (!canvasEl) {
      return;
    }

    canvas = canvasEl;

    const canvasCtx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = 90;

    bufferLength = Math.round(canvas.width / 3);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    if (audio.paused) {
      drawFrame(true);
    }
  }

  function drawFrame(staticRender: boolean = false) {
    if (!canvas) {
      return;
    }

    const canvasCtx = canvas.getContext('2d')!;
    let dataArray = new Uint8Array(bufferLength);

    // instead of fetching mp3 and calculating whole buffer
    // we'll just fill dataArray with random values
    // it is much performant and not crucial to UI/UX
    if (staticRender) {
      dataArray = createRandomUint8Array(bufferLength);
    } else {
      analyser.getByteFrequencyData(dataArray);
    }

    let x = 0;
    const barWidth = Math.round(canvas.width / bufferLength);

    canvasCtx.fillStyle = 'rgb(255,255,255)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
      let barHeight = (dataArray[i] / 255) * (canvas.height - 25);
      if ((audio.duration / bufferLength) * i <= audio.currentTime) {
        canvasCtx.fillStyle = '#97a9b2';
      } else {
        canvasCtx.fillStyle = '#dee7eb';
      }

      canvasCtx.fillRect(x, 65, 2, -barHeight);

      x = barWidth * i;
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

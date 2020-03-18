function createAudioContext() {
  (AudioContext as any) =
    (window as any).AudioContext || (window as any).webkitAudioContext;
  const context = new AudioContext();
  const analyser = context.createAnalyser();

  return { context, analyser };
}

export function createPlayer() {
  const { analyser, context } = createAudioContext();
  const audio = new Audio();
  const source = context.createMediaElementSource(audio);
  let canvas: HTMLCanvasElement = null;
  let bufferLength: number;
  analyser.fftSize = 1024;

  function setSong(songUrl: string) {
    audio.src = songUrl;
    audio.crossOrigin = 'anonymous';
    source.connect(analyser);
    analyser.connect(context.destination);

    return () => {
      analyser.disconnect();
    };
  }

  function play() {
    if (audio.src) {
      audio.play();
    }
  }

  function pause() {
    audio.pause();
  }

  function changeVolume(volume: number) {
    audio.volume = volume;
  }

  function setPlayback(time: number) {
    audio.currentTime = time;
  }

  function drawCanvas(canvasEl: HTMLCanvasElement) {
    if (!canvasEl) {
      return;
    }

    canvas = canvasEl;

    const canvasCtx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = 90;

    // calcualte optimal buffer length from canvas width
    bufferLength = Math.round(canvas.width / 3);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    drawFrame(true);
  }

  function drawFrame(staticRender: boolean = false) {
    if (!canvas) {
      return;
    }

    const canvasCtx = canvas.getContext('2d')!;
    const dataArray = new Uint8Array(bufferLength);

    if (staticRender) {
      analyser.getByteTimeDomainData(dataArray);
    } else {
      analyser.getByteFrequencyData(dataArray);
    }

    let x = 0;

    // round value for sharper bars
    const barWidth = Math.round(canvas.width / bufferLength);

    canvasCtx.fillStyle = 'rgb(255,255,255)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
      let barHeight = (dataArray[i] / 255) * (canvas.height - 25);
      if ((audio.duration / bufferLength) * i <= audio.currentTime) {
        canvasCtx.fillStyle = '#8faab5';
      } else {
        canvasCtx.fillStyle = '#dbe9ea';
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
    changeVolume,
    drawCanvas,
    drawFrame,
  };
}

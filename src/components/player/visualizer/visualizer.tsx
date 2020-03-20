import React from 'react';

import './visualizer.scss';

type Props = {
  canvasRef: any;
};

export default function Visualizer({ canvasRef }: Props) {
  return <canvas className="visualizer" ref={canvasRef} height={0}></canvas>;
}

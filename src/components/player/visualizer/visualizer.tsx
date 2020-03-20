import React from 'react';

import './visualizer.scss';

type Props = {
  canvasRef: any;
};

export default function Visualizer(props: Props) {
  const { canvasRef } = props;
  return <canvas className="visualizer" ref={canvasRef} height={0}></canvas>;
}

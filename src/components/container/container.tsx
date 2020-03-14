import React from 'react';
import './container.scss';

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

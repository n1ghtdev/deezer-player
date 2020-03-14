import React from 'react';
import './header.scss';

export default function Header({ children }: { children: React.ReactNode }) {
  return <div className="header">{children}</div>;
}

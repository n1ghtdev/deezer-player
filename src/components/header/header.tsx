import React from 'react';
import './header.scss';

export default function Header({
  title,
  searchBar,
}: {
  title: string;
  searchBar: React.ReactNode;
}) {
  return (
    <div className="header">
      <h1 className="header_title">{title}</h1>
      {searchBar}
    </div>
  );
}

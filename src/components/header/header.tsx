import React from 'react';

import './header.scss';

type Props = {
  title: string;
  searchBar: React.ReactNode;
};

export default function Header({ title, searchBar }: Props) {
  return (
    <div className="header">
      <h1 className="header_title">{title}</h1>
      {searchBar}
    </div>
  );
}

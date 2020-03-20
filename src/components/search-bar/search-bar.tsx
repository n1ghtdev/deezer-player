import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './search-bar.scss';

type Props = {
  onSubmit: (query: string) => void;
};

export default function Header({ onSubmit }: Props) {
  const [value, setValue] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  }

  return (
    <form className="search-bar_form" onSubmit={handleSubmit}>
      <input
        className="search-bar_input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search"
      />
      <button className="search-bar_button" type="submit">
        <FontAwesomeIcon icon="search" />
      </button>
    </form>
  );
}

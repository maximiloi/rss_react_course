import { ChangeEvent } from 'react';
import Search from '@components/Search';

import './style.scss';

interface Props {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Header({ onSearchChange }: Props) {
  return (
    <header className="header">
      <h1 className="header__title">Hello, RSS React student</h1>
      <Search onSearchChange={onSearchChange} />
    </header>
  );
}

export default Header;

import Search from '@components/Search';

import './style.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Hello, RSS React student</h1>
      <Search />
    </header>
  );
}

export default Header;

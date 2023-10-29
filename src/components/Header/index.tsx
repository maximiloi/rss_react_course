import { Component } from 'react';
import Search from '../Search';

import './style.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__title">Hello, RSS React student</h1>
        <Search />
      </header>
    );
  }
}

export default Header;

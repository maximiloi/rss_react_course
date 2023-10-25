import { Component } from 'react';
import Search from '../Search';

import './style.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Hello, RSS</h1>
        <Search />
      </header>
    );
  }
}

export default Header;

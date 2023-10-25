import { Component } from 'react';

import './style.scss';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input
          type="text"
          className="header__search search__input"
          placeholder="search movie..."
        />
        <button type="button" className="search__button">
          search
        </button>
      </div>
    );
  }
}

export default Search;

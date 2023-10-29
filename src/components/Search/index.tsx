import { Component } from 'react';

import './style.scss';

interface InputValueProps {}

interface InputValueState {
  inputValue: string;
}

class Search extends Component<InputValueProps, InputValueState> {
  constructor(props: InputValueProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleSearch = () => {
    const { inputValue } = this.state;

    if (inputValue) {
      localStorage.setItem('name-cinema-iloi', inputValue);
      const inputHtmlElem = document.querySelector(
        '.search__input'
      ) as HTMLInputElement;
      if (inputHtmlElem) inputHtmlElem.value = '';
    }
  };

  handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleInputChange = (event: { target: { value: string } }) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div className="search" data-testid="search-component">
        <input
          type="text"
          className="search__input"
          placeholder="search movie..."
          value={inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
        <button
          type="button"
          className="search__button"
          onClick={this.handleSearch}
        >
          search
        </button>
      </div>
    );
  }
}

export default Search;

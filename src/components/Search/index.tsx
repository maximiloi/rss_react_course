import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

import './style.scss';

interface Props {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Search({ onSearchChange }: Props) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = () => {
    onSearchChange({
      target: {
        value: inputValue,
      },
    } as ChangeEvent<HTMLInputElement>);

    if (inputValue) {
      localStorage.setItem('name-cinema-iloi', inputValue);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('name-cinema-iloi');
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  return (
    <div className="search" data-testid="search-component">
      <input
        type="text"
        className="search__input"
        placeholder="search movie..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button type="button" className="search__button" onClick={handleSearch}>
        search
      </button>
    </div>
  );
}

export default Search;

import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LocalStorage from '@helper/localStorage';

import './style.scss';

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    LocalStorage.setResult(inputValue);

    searchParams.set('search', inputValue);
    navigate(`?${searchParams}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const storedValue = LocalStorage.getResult();
    if (typeof storedValue === 'string') setInputValue(storedValue);
  }, []);

  return (
    <form className="search" data-testid="search-component">
      <input
        type="text"
        className="search__input"
        placeholder="search movie..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button" onClick={handleSearch}>
        search
      </button>
    </form>
  );
}

export default Search;

import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LocalStorage from '@helper/localStorage';

import './style.scss';

function Search() {
  const [searchValue, setSearchValue] = useState<string>('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const storedSearchValue: string | null =
      LocalStorage.getLocalStorageValue();

    if (searchValue !== storedSearchValue) {
      LocalStorage.setLocalStorageValue(searchValue);

      searchParams.set('search', searchValue);
      searchParams.delete('page');
      navigate(`?${searchParams}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const storedSearchValue: string | null =
      LocalStorage.getLocalStorageValue();

    if (typeof storedSearchValue === 'string') {
      setSearchValue(storedSearchValue);
    }
  }, []);

  return (
    <form className="search" data-testid="search-component">
      <input
        type="text"
        className="search__input"
        placeholder="search movie..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button" onClick={handleSearch}>
        search
      </button>
    </form>
  );
}

export default Search;

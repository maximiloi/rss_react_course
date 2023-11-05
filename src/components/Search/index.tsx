import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import LocalStorage from '@helper/localStorage';

import './style.scss';

interface Props {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Search({ onSearchChange }: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSearchChange({
      target: {
        value: inputValue,
      },
    } as ChangeEvent<HTMLInputElement>);

    if (inputValue !== localStorage.getItem('name-cinema-iloi')) {
      LocalStorage.setResult(inputValue);

      searchParams.set('search', inputValue);
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const storedValue = LocalStorage.getResult();
    if (typeof storedValue === 'string') setInputValue(storedValue);
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    if (!query) return;
    LocalStorage.setResult(query);
    setInputValue(query);
  }, [location.search]);

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

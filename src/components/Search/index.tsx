import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import './style.scss';

interface Props {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Search({ onSearchChange }: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = localStorage.getItem('name-cinema-iloi');
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onSearchChange({
      target: {
        value: inputValue,
      },
    } as ChangeEvent<HTMLInputElement>);

    if (inputValue) {
      localStorage.setItem('name-cinema-iloi', inputValue);

      searchParams.set('search', inputValue);
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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

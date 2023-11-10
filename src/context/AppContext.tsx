import { createContext } from 'react';

const AppContext = createContext({
  searchValue: '',
  setSearchValue: () => {},
  loading: true,
  setLoading: () => {},
});

export default AppContext;

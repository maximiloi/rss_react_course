import { createContext } from 'react';

export type AppContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dataIsEmpty: boolean;
  setDataIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  searchValue: '',
  setSearchValue: () => {},
  loading: true,
  setLoading: () => {},
  dataIsEmpty: false,
  setDataIsEmpty: () => {},
});

export default AppContext;

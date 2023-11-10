import { useMemo, useState } from 'react';
import AppContext, { AppContextType } from '@context/AppContext';
import Header from '@components/Header';
import Main from '@components/Main';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const appContextValue: AppContextType = useMemo(
    () => ({ searchValue, setSearchValue, loading, setLoading }),
    [loading, searchValue]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      <Header />
      <Main />
    </AppContext.Provider>
  );
}

export default App;

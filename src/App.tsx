import { SetStateAction, useState } from 'react';
import Header from '@components/Header';
import Main from '@components/Main';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <Main searchTitle={searchTerm} />
    </>
  );
}

export default App;

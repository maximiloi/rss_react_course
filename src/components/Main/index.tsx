import { useEffect, useState } from 'react';
import Card from '@components/Card';
import LocalStorage from '@helper/localStorage';

import './style.scss';

interface Props {
  searchTitle: string;
}

function Main({ searchTitle }: Props) {
  const [mainText, setMainText] = useState('');

  useEffect(() => {
    const valueLocalStorage = LocalStorage.getResult();
    const text = valueLocalStorage
      ? `Your last request "${valueLocalStorage}"`
      : `Type in the title of the movie in English`;

    setMainText(text);
  }, []);

  return (
    <main>
      <h2>{mainText}</h2>
      <Card searchWord={searchTitle} />
    </main>
  );
}

export default Main;

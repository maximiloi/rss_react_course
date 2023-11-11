import { useContext } from 'react';
import AppContext from '@context/AppContext';
import Card from '@components/Card';

import './style.scss';

function Main() {
  const { dataIsEmpty } = useContext(AppContext);

  return (
    <main>
      {!dataIsEmpty ? <h2>Type in the title of the movie in English</h2> : ''}
      <Card />
    </main>
  );
}

export default Main;

import Card from '@components/Card';

import './style.scss';

interface Props {
  searchTitle: string;
}

function Main({ searchTitle }: Props) {
  return (
    <main>
      <h2>Type in the title of the movie in English</h2>
      <Card searchWord={searchTitle} />
    </main>
  );
}

export default Main;

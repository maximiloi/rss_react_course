import { useEffect, useState } from 'react';
import Spin from '@components/Spin';
import Pagination from '@components/Pagination';
import ApiResponse from '@helper/apiResponce';
import LocalStorage from '@helper/localStorage';

import './style.scss';

export interface ICard {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

interface Props {
  searchWord: string;
}

function Card({ searchWord }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemArray, setItemArray] = useState<ICard[] | null>(null);
  const [totalCards, setTotalCards] = useState<string>('');

  const fetchData = async (keyword: string, pageNumber = 1) => {
    const response: {
      Search: ICard[];
      totalResults: string;
    } = await ApiResponse.fetchData(keyword, pageNumber);

    setItemArray(response.Search);
    setTotalCards(response.totalResults);
    setLoading(false);
  };

  const handlePageChange = (pageNumber: number) => {
    const valueLocalStorage = LocalStorage.getResult();
    if (typeof valueLocalStorage === 'string') {
      fetchData(valueLocalStorage, pageNumber);
    }
  };

  useEffect(() => {
    const valueLocalStorage = LocalStorage.getResult();
    if (typeof valueLocalStorage === 'string') {
      fetchData(valueLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (searchWord) {
      fetchData(searchWord);
    }
  }, [searchWord]);

  return (
    <>
      <div className="card card__wrapper">
        {loading ? (
          <Spin />
        ) : (
          itemArray?.map((item: ICard) => (
            <div className="card__item" key={item.imdbID}>
              <img
                className="card__img"
                src={item.Poster}
                alt={item.Title}
                width="182px"
                height="268px"
              />
              <p>{item.Year}</p>
              <h3>{item.Title}</h3>
            </div>
          ))
        )}
      </div>
      <Pagination totalCards={totalCards} onPageChange={handlePageChange} />
    </>
  );
}

export default Card;

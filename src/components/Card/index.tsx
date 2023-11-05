/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import Spin from '@components/Spin';
import Item from '@components/Item';
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
  const [imdbIdCard, setimdbIdCard] = useState<string>('');

  const fetchCardsData = async (keyword: string, pageNumber = '1') => {
    try {
      setLoading(true);
      const response: {
        Search: ICard[];
        totalResults: string;
      } = await ApiResponse.fetchCardsData(keyword, pageNumber);

      setItemArray(response.Search);
      setTotalCards(response.totalResults);
    } catch (error) {
      console.error('Error fetching card data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    const valueLocalStorage = LocalStorage.getResult();
    if (typeof valueLocalStorage === 'string') {
      fetchCardsData(valueLocalStorage, pageNumber.toString());
    }
  };

  const handleCardItemClick = (itemId: string) => {
    setimdbIdCard(itemId);
  };

  useEffect(() => {
    const valueLocalStorage = LocalStorage.getResult();
    if (typeof valueLocalStorage === 'string') {
      fetchCardsData(valueLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (searchWord) {
      fetchCardsData(searchWord);
    }
  }, [searchWord]);

  return (
    <>
      <div className="cards cards__wrapper">
        <div className="card card__list">
          {loading ? (
            <Spin />
          ) : (
            itemArray?.map((item: ICard) => (
              <div
                className="card__item"
                key={item.imdbID}
                onClick={() => handleCardItemClick(item.imdbID)}
              >
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
        <Item IdIMDB={imdbIdCard} searchWord={searchWord} />
      </div>
      <Pagination
        totalCards={totalCards}
        onPageChange={handlePageChange}
        searchWord={searchWord}
      />
    </>
  );
}

export default Card;

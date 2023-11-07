/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import Spin from '@components/Spin';
import Item from '@components/Item';
import Pagination from '@components/Pagination';
import ApiResponse from '@helper/apiResponce';
import LocalStorage from '@helper/localStorage';

import './style.scss';

interface ICard {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

function Card() {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemArray, setItemArray] = useState<ICard[] | null>(null);
  const [totalCards, setTotalCards] = useState<string>('');
  const [imdbIdCard, setImdbIdCard] = useState<string>('');
  const [pageChange, setPageChange] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>('');

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const fetchCardsData = async (keyword: string, pageNumber: number) => {
    try {
      setLoading(true);
      const response: {
        Search: ICard[];
        totalResults: string;
      } = await ApiResponse.fetchCardsData(keyword, pageNumber.toString());
      setItemArray(response.Search);
      setTotalCards(response.totalResults);
    } catch (error) {
      console.error('Error fetching card data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPageChange(pageNumber);
  };

  const handleCardItemClick = (itemId: string) => {
    setImdbIdCard(itemId);
  };

  useEffect(() => {
    const query: string | null = searchParams.get('search');

    if (query) return;

    const valueLocalStorage = LocalStorage.getResult();
    if (typeof valueLocalStorage === 'string') {
      fetchCardsData(valueLocalStorage, pageChange);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    const page = searchParams.get('page');

    if (query && !page) {
      fetchCardsData(query, 1);
      setSearchWord(query);
    }
    if (query && page) {
      fetchCardsData(query, +page);
    }
  }, [location.search]);

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
        <Item
          IdIMDB={imdbIdCard}
          searchWord={searchWord}
          pageChange={pageChange}
        />
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

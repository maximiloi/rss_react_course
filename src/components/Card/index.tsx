import { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Outlet, Link } from 'react-router-dom';

import Spin from '@components/Spin';
import Pagination from '@components/Pagination';
import ApiResponse from '@helper/apiResponce';
import LocalStorage from '@helper/localStorage';

import { IFetchResponce, ICard } from './type';
import './style.scss';

function Card() {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemArray, setItemArray] = useState<ICard[] | null>(null);
  const [totalCards, setTotalCards] = useState<string>('');
  const [pageChange, setPageChange] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>('');

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const fetchCardsData = async (keyword: string, pageNumber: number) => {
    try {
      setLoading(true);
      const response: IFetchResponce = await ApiResponse.fetchCardsData(
        keyword,
        pageNumber.toString()
      );

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

  useEffect(() => {
    const query: string | null = searchParams.get('search');
    const storedSearchValue = LocalStorage.getLocalStorageValue();

    if (query) return;

    if (typeof storedSearchValue === 'string') {
      fetchCardsData(storedSearchValue, pageChange);
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
              <Link to={`item/${item.imdbID}`} key={item.imdbID}>
                <div className="card__item">
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
              </Link>
            ))
          )}
        </div>
        <Outlet />
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

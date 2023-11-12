import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useLocation, Outlet, Link } from 'react-router-dom';

import AppContext from '@context/AppContext';
import CardContext, { CardContextType } from '@context/CardContext';
import Spin from '@components/Spin';
import Pagination from '@components/Pagination';
import ApiResponse from '@helper/apiResponse';
import LocalStorage from '@helper/localStorage';

import { IFetchResponce, ICard } from './type';
import './style.scss';

function Card() {
  const { setSearchValue, loading, setLoading, setDataIsEmpty } =
    useContext(AppContext);

  const [totalCards, setTotalCards] = useState<string>('');
  const [pageChange, setPageChange] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemCount, setItemCount] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const cardContextValue: CardContextType = useMemo(
    () => ({
      totalCards,
      setTotalCards,
      pageChange,
      setPageChange,
      currentPage,
      setCurrentPage,
      itemCount,
      setItemCount,
      isVisible,
      setIsVisible,
    }),
    [totalCards, pageChange, currentPage, itemCount, isVisible]
  );

  const [itemArray, setItemArray] = useState<ICard[] | null>(null);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const fetchCardsData = async (keyword: string, pageNumber: number) => {
    try {
      setLoading(true);
      setDataIsEmpty(true);
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
      setSearchValue(query);
    }
    if (query && page) {
      fetchCardsData(query, +page);
    }
  }, [location.search]);

  return (
    <CardContext.Provider value={cardContextValue}>
      <div className="cards cards__wrapper" data-testid="cards-component">
        <div className="card card__list">
          {loading ? (
            <Spin />
          ) : (
            itemArray?.map((item: ICard) => (
              <Link to={`/${item.imdbID}`} key={item.imdbID}>
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
      <Pagination />
    </CardContext.Provider>
  );
}

export default Card;

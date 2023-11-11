/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import AppContext from '@context/AppContext';
import CardContext from '@context/CardContext';
import LocalStorage from '@helper/localStorage';

import './style.scss';

function Pagination() {
  const { searchValue } = useContext(AppContext);

  const {
    totalCards,
    setPageChange,
    currentPage,
    setCurrentPage,
    itemCount,
    setItemCount,
  } = useContext(CardContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPageChange(pageNumber);

    const storedSearchValue = LocalStorage.getLocalStorageValue();
    if (!storedSearchValue) return;

    if (pageNumber === 1) {
      searchParams.set('search', storedSearchValue);
      searchParams.delete('page');
    } else {
      searchParams.set('search', storedSearchValue);
      searchParams.set('page', pageNumber.toString());
    }
    navigate(`?${searchParams.toString()}`);
  };

  const renderPagination = () => {
    const visiblePages = 5;
    const pages = [];

    if (itemCount <= visiblePages) {
      for (let i = 1; i <= itemCount; i += 1) {
        pages.push(
          <li
            key={i}
            className={
              currentPage === i ? 'active pagination__item' : 'pagination__item'
            }
            onClick={() => handlePageChange(i)}
          >
            <span>{i}</span>
          </li>
        );
      }
    } else {
      const middlePage = Math.ceil(visiblePages / 2);
      let startPage;
      let endPage;

      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + middlePage >= itemCount) {
        startPage = itemCount - visiblePages + 1;
        endPage = itemCount;
      } else {
        startPage = currentPage - middlePage + 1;
        endPage = currentPage + middlePage - 1;
      }

      for (let i = startPage; i <= endPage; i += 1) {
        pages.push(
          <li
            key={i}
            className={
              currentPage === i ? 'active pagination__item' : 'pagination__item'
            }
            onClick={() => handlePageChange(i)}
          >
            <span>{i}</span>
          </li>
        );
      }
    }

    return (
      <ul className="pagination__list">
        {currentPage > Math.ceil(visiblePages / 2) ? (
          <li
            className={
              currentPage === 1
                ? 'disabled pagination__item'
                : 'pagination__item'
            }
            onClick={() => handlePageChange(1)}
          >
            <span>1</span>
          </li>
        ) : (
          ''
        )}
        {pages}
        <li
          className={
            currentPage === itemCount
              ? 'disabled pagination__item'
              : 'pagination__item'
          }
          onClick={() => handlePageChange(itemCount)}
        >
          <span>{itemCount}</span>
        </li>
      </ul>
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  useEffect(() => {
    const totalPages = Math.ceil(Number(totalCards) / 10);
    setItemCount(totalPages);
  }, [totalCards]);

  useEffect(() => {
    const page = searchParams.get('page');
    if (!page) return;
    setCurrentPage(+page);
  }, [location.search]);

  return <div className="pagination">{renderPagination()}</div>;
}

export default Pagination;

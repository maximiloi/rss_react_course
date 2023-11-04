/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import './style.scss';

function Pagination({
  totalCards,
  onPageChange,
  searchWord,
}: {
  totalCards: string;
  onPageChange: (pageNumber: number) => void;
  searchWord: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord]);

  useEffect(() => {
    const totalPages = Math.ceil(+totalCards / 10);
    setPageCount(totalPages);
  }, [totalCards]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPagination = () => {
    const visiblePages = 5;
    const pages = [];

    if (pageCount <= visiblePages) {
      for (let i = 1; i <= pageCount; i += 1) {
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
      } else if (currentPage + middlePage >= pageCount) {
        startPage = pageCount - visiblePages + 1;
        endPage = pageCount;
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
        <li
          className={
            currentPage === 1 ? 'disabled pagination__item' : 'pagination__item'
          }
          onClick={() => handlePageChange(1)}
        >
          <span>1</span>
        </li>
        {pages}
        <li
          className={
            currentPage === pageCount
              ? 'disabled pagination__item'
              : 'pagination__item'
          }
          onClick={() => handlePageChange(pageCount)}
        >
          <span>{pageCount}</span>
        </li>
      </ul>
    );
  };

  return <div className="pagination">{renderPagination()}</div>;
}

export default Pagination;

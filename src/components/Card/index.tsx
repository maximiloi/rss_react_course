import { useEffect, useState } from 'react';
import Spin from '@components/Spin';
import ApiResponse from '@helper/apiResponce';
import LocalStorage from '@helper/localStorage';

import './style.scss';

interface ResponseState {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

interface Props {
  searchWord: string;
}

function Card({ searchWord }: Props) {
  const [responseData, setResponseData] = useState<ResponseState[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (keyword: string) => {
    const response: ResponseState[] = await ApiResponse.fetchData(keyword);
    setResponseData(response);
    setLoading(false);
  };

  useEffect(() => {
    const valueLocalStorage = LocalStorage.getResult();
    if (typeof valueLocalStorage === 'string') {
      fetchData(valueLocalStorage);
    }
  });

  useEffect(() => {
    fetchData(searchWord);
  }, [searchWord]);

  return (
    <div className="card card__wrapper">
      {loading ? (
        <Spin />
      ) : (
        responseData?.map((item: ResponseState) => (
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
  );
}

export default Card;

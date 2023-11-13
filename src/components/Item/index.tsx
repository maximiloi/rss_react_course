/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect } from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import CardContext from '@context/CardContext';
import ApiResponse from '@helper/apiResponse';
import setRatingColor from '@helper/setRatingColor';

import { ItemInterface } from './type';
import './style.scss';

export async function loaderCardData({ params }: LoaderFunctionArgs) {
  if (typeof params.itemId === 'undefined') {
    throw new Error('не правильный ид');
  }
  const itemResponse: ItemInterface = await ApiResponse.fetchItemData(
    params.itemId
  );

  if (itemResponse.Response === 'True') {
    return { itemResponse };
  }

  throw new Error(`${itemResponse.Error}`);
}

function Item() {
  const { isVisible, setIsVisible } = useContext(CardContext);
  const { itemResponse } = useLoaderData() as { itemResponse: ItemInterface };

  const navigate = useNavigate();

  const closeItem = () => {
    navigate(-1);
  };

  const handleItemClick = () => {
    setIsVisible(false);
    navigate(-1);
  };

  useEffect(() => {
    const overflowEl = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflowEl;
      setIsVisible(true);
    };
  }, [setIsVisible]);

  const {
    Poster,
    Title,
    Released,
    Genre,
    Director,
    Actors,
    Plot,
    imdbRating,
    Type,
  } = itemResponse;

  return (
    <>
      <div className="item">
        <div className="item__box">
          <button className="item__close" type="button" onClick={closeItem}>
            Close
          </button>
          <img src={Poster} alt={Title} className="item__img-top" />
          <div className="item__body">
            <span className="item__type">Type: {Type}</span>
            <h3 className="item__title">{Title}</h3>
            <p className="item__text">
              IMDb Rating: {setRatingColor(Number(imdbRating))}
            </p>
            <p className="item__text">Premiere: {Released}</p>
            <p className="item__text">Genre: {Genre}</p>
            <p className="item__text">Director: {Director}</p>
            <p className="item__text">Actors: {Actors}</p>
            <p className="item__text">Plot: {Plot}</p>
          </div>
        </div>
      </div>
      {isVisible && <div className="item__layout" onClick={handleItemClick} />}
    </>
  );
}

export default Item;

import { useLoaderData, useNavigate } from 'react-router-dom';
import ApiResponse from '@helper/apiResponce';
import setRatingColor from '@helper/setRatingColor';

import { ItemInterface, ParamsInterface } from './type';
import './style.scss';

export async function loaderCardData({ params }: { params: ParamsInterface }) {
  const itemResponce: ItemInterface = await ApiResponse.fetchItemData(
    params.itemId
  );

  if (itemResponce.Response === 'True') {
    return { itemResponce };
  }

  throw new Error(`${itemResponce.Error}`);
}

function Item() {
  const { itemResponce } = useLoaderData() as { itemResponce: ItemInterface };
  const navigate = useNavigate();

  const closeItem = () => {
    navigate(-1);
  };

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
  } = itemResponce;

  return (
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
            IMDb Rating: {setRatingColor(imdbRating)}
          </p>
          <p className="item__text">Premiere: {Released}</p>
          <p className="item__text">Genre: {Genre}</p>
          <p className="item__text">Director: {Director}</p>
          <p className="item__text">Actors: {Actors}</p>
          <p className="item__text">Plot: {Plot}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;

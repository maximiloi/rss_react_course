import { useEffect, useState } from 'react';
import Spin from '@components/Spin';
import ApiResponse from '@helper/apiResponce';

import './style.scss';

interface ItemInterface {
  Poster: string;
  Title: string;
  Released: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Type: string;
  imdbRating: number;
}

interface Props {
  IdIMDB: string;
}

function Item({ IdIMDB }: Props) {
  const [totalCards, setTotalCards] = useState<ItemInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isItemVisible, setItemIsVisible] = useState(true);

  const fetchCardData = async () => {
    try {
      setIsLoading(true);
      const response = await ApiResponse.fetchItemData(IdIMDB);
      setTotalCards(response);
    } catch (error) {
      console.error('Error fetching item data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating: number) => {
    const ratingNumber =
      typeof rating === 'number' ? rating : parseFloat(rating);
    if (ratingNumber) {
      if (ratingNumber >= 7.6) {
        return <span className="green">{rating}</span>;
      }
      if (ratingNumber >= 5.5 && ratingNumber < 7.5) {
        return <span className="yellow">{rating}</span>;
      }
    }
    return <span className="red">{rating}</span>;
  };

  const handleUnmount = () => {
    setItemIsVisible(false);
  };

  useEffect(() => {
    if (IdIMDB) {
      fetchCardData();
      setItemIsVisible(true);
    }
  }, [IdIMDB]);

  if (isLoading) {
    return <Spin />;
  }

  if (!totalCards) {
    return '';
  }

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
  } = totalCards;

  return (
    <div className="item">
      {isItemVisible && (
        <div className="item__box">
          <button className="item__close" type="button" onClick={handleUnmount}>
            Close
          </button>
          <img src={Poster} alt={Title} className="item__img-top" />
          <div className="item__body">
            <span className="item__type">Type: {Type}</span>
            <h3 className="item__title">{Title}</h3>
            <p className="item__text">
              IMDb Rating: {getRatingColor(imdbRating)}
            </p>
            <p className="item__text">Premiere: {Released}</p>
            <p className="item__text">Genre: {Genre}</p>
            <p className="item__text">Director: {Director}</p>
            <p className="item__text">Actors: {Actors}</p>
            <p className="item__text">Plot: {Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;

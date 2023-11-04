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
  imdbRating: number;
}

interface Props {
  IdIMDB: string;
}

function Item({ IdIMDB }: Props) {
  const [totalCards, setTotalCards] = useState<ItemInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (IdIMDB) {
      fetchCardData();
    }
  }, [IdIMDB]);

  if (isLoading) {
    return <Spin />;
  }

  if (!totalCards) {
    return <div>No data available</div>;
  }

  const { Poster, Title, Released, Genre, Director, Actors, Plot, imdbRating } =
    totalCards;

  return (
    <div className="item__wrapper">
      <div className="item__box">
        <img src={Poster} alt={Title} className="item__img-top" />
        <div className="item__body">
          <h3 className="item__title">{Title}</h3>
          <p className="item__text">
            IMDb Rating: {getRatingColor(imdbRating)}
          </p>
          <p className="item__text">Released: {Released}</p>
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

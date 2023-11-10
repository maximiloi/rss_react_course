const setRatingColor = (rating: number) => {
  const ratingNumber = typeof rating === 'number' ? rating : parseFloat(rating);

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

export default setRatingColor;

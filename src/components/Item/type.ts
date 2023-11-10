export interface LoaderParams {
  itemId: string;
}

export interface ItemInterface {
  Poster: string;
  Title: string;
  Released: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Type: string;
  imdbRating: string;
  Response: string;
  Error: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Language: string;
  Metascore: string;
  Production: string;
  Rated: string;
  Runtime: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbVotes: string;
  Ratings: RatingsResponse[];
}

interface RatingsResponse {
  Source: string;
  Value: string;
}

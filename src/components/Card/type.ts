export interface ICard {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

export interface IFetchResponce {
  Search: ICard[];
  totalResults: string;
}

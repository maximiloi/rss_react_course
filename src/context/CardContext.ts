import { createContext } from 'react';

export type CardContextType = {
  totalCards: string;
  setTotalCards: React.Dispatch<React.SetStateAction<string>>;
  pageChange: number;
  setPageChange: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
};

const CardContext = createContext<CardContextType>({
  totalCards: '',
  setTotalCards: () => {},
  pageChange: 1,
  setPageChange: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  itemCount: 1,
  setItemCount: () => {},
});

export default CardContext;

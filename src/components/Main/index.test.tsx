import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AppContext, { AppContextType } from '../../context/AppContext';
import Main from './index';

describe('Main component', () => {
  it('renders without errors', () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  });

  it('displays title when data is not empty', () => {
    render(
      <AppContext.Provider value={{ dataIsEmpty: false } as AppContextType}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const titleElement = screen.getByTestId('main-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(
      'Type in the title of the movie in English'
    );
  });

  it('does not display title when data is empty', () => {
    render(
      <AppContext.Provider value={{ dataIsEmpty: true } as AppContextType}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const titleElement = screen.queryByTestId('main-title');
    expect(titleElement).toBeNull();
  });

  it('renders Cards component', () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    const cardsElement = screen.getByTestId('cards-component');
    expect(cardsElement).toBeInTheDocument();
  });
});

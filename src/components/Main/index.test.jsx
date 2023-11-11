import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Main from './index';

describe('Main component', () => {
  it('renders without errors', () => {
    render(<Main />);
  });

  it('displays title when data is not empty', () => {
    render(<Main />, {
      context: {
        AppContext: {
          value: { dataIsEmpty: false },
        },
      },
    });

    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(
      'Type in the title of the movie in English'
    );
  });

  it('does not display title when data is empty', () => {
    render(<Main />, {
      context: {
        AppContext: {
          value: { dataIsEmpty: true },
        },
      },
    });

    const titleElement = screen.queryByRole('heading', { level: 2 });
    expect(titleElement).toBeNull();
  });

  it('renders Cards component', () => {
    render(<Main />);

    const cardsElement = screen.getByTestId('cards-component');
    expect(cardsElement).toBeInTheDocument();
  });
});

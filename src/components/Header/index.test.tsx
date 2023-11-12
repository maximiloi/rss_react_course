import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './index';

describe('Header component', () => {
  it('displays title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Hello, RSS React student');
  });

  it('renders Search component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const searchElement = screen.getByTestId('search-component');
    expect(searchElement).toBeInTheDocument();
  });
});

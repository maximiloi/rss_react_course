import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header component', () => {
  it('displays title', () => {
    render(<Header />);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Hello, RSS React student');
  });

  it('renders search component', () => {
    render(<Header />);

    const searchElement = screen.getByTestId('search-component');
    expect(searchElement).toBeInTheDocument();
  });
});

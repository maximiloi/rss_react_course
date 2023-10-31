import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('renders "Hello, RSS" title and search component', () => {
    render(<Header />);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent('Hello, RSS React student');

    const searchElement = screen.getByTestId('search-component');
    expect(searchElement).toBeInTheDocument();
  });
});

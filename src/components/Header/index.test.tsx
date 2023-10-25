import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('Renders "Hello, RSS"', () => {
    // ARRANGE
    render(<Header />);
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello, RSS');
  });
});

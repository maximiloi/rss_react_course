import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders Header and Main components', () => {
    render(<App />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});

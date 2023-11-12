import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders Header and Main components', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});

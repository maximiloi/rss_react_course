import { describe, expect, it } from 'vitest';
import setRatingColor from './setRatingColor';

describe('setRatingColor', () => {
  it('should return a green span for rating >= 7.6', () => {
    const rating = 8.0;
    const result = setRatingColor(rating);
    expect(result.props.className).toBe('green');
    expect(result.props.children).toBe(rating);
  });

  it('should return a yellow span for rating between 5.5 and 7.5', () => {
    const rating = 6.0;
    const result = setRatingColor(rating);
    expect(result.props.className).toBe('yellow');
    expect(result.props.children).toBe(rating);
  });

  it('should return a red span for rating below 5.5', () => {
    const rating = 4.5;
    const result = setRatingColor(rating);
    expect(result.props.className).toBe('red');
    expect(result.props.children).toBe(rating);
  });
});

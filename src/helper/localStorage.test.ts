import { describe, expect, it, beforeEach } from 'vitest';

import LocalStorage from './localStorage';

describe('LocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getLocalStorageValue should return the stored value', () => {
    const storedValue = `Hey, RSS student, you're awesome.`;
    localStorage.setItem('name-cinema-iloi', storedValue);

    const result = LocalStorage.getLocalStorageValue();
    expect(result).toBe(storedValue);
  });

  it('setLocalStorageValue should store the provided value', () => {
    const valueToStore = `Hey, RSS student, you're awesome.`;
    LocalStorage.setLocalStorageValue(valueToStore);

    expect(localStorage.getItem('name-cinema-iloi')).toBe(valueToStore);
  });
});

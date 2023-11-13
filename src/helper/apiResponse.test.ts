import { describe, expect, it, vi } from 'vitest';
import ApiResponse from './apiResponse';

describe('ApiResponse', () => {
  it('should fetch data from a given URL', async () => {
    const mockResponse = {
      Title: 'Inception',
      Year: '2010',
      imdbID: 'tt1375666',
    };
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });
    const data = await ApiResponse.fetchData('someurl');
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('someurl');
  });

  it('should fetch cards data based on value and page number', async () => {
    const mockCardsResponse = {
      Search: [{ Title: 'Inception', Year: '2010', imdbID: 'tt1375666' }],
    };
    vi.spyOn(ApiResponse, 'fetchData').mockResolvedValue(mockCardsResponse);
    const cardsData = await ApiResponse.fetchCardsData('inception', '1');
    expect(cardsData).toEqual(mockCardsResponse);
    expect(ApiResponse.fetchData).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?apikey=67e1bb9b&s=inception&page=1'
    );
  });

  it('should fetch item data based on IMDB ID', async () => {
    const mockItemResponse = {
      Title: 'Inception',
      Year: '2010',
      imdbID: 'tt1375666',
    };
    vi.spyOn(ApiResponse, 'fetchData').mockResolvedValue(mockItemResponse);
    const itemData = await ApiResponse.fetchItemData('tt1375666');
    expect(itemData).toEqual(mockItemResponse);
    expect(ApiResponse.fetchData).toHaveBeenCalledWith(
      'https://www.omdbapi.com/?apikey=67e1bb9b&i=tt1375666'
    );
  });
});

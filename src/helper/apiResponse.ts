const API_KEY = '67e1bb9b';
const API_URL = 'https://www.omdbapi.com/';

class ApiResponse {
  static async fetchData(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static async fetchCardsData(value: string, pageNumber: string) {
    const url = `${API_URL}?apikey=${API_KEY}&s=${value}&page=${pageNumber}`;
    return ApiResponse.fetchData(url);
  }

  static async fetchItemData(IdIMDB: string) {
    const url = `${API_URL}?apikey=${API_KEY}&i=${IdIMDB}`;
    return ApiResponse.fetchData(url);
  }
}

export default ApiResponse;

class ApiResponse {
  static async fetchData(value: string, pageNumber = 1) {
    const url = `https://www.omdbapi.com/?apikey=67e1bb9b&s=${value}&page=${pageNumber}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }
}

export default ApiResponse;

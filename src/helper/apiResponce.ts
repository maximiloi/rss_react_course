class ApiResponse {
  static async fetchData(value: string) {
    const url = `https://www.omdbapi.com/?s=${value}&apikey=67e1bb9b`;

    const response = await fetch(url);
    const data = await response.json();
    const results = await data.Search;

    return results;
  }
}

export default ApiResponse;

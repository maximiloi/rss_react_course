class GetResponse {
  static async fetchData() {
    const value = 'saw';
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${value}/`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f939e2d1a8msh8e48a6731bc3d0ep1a0f84jsn4fe9a851bdc9',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default GetResponse;

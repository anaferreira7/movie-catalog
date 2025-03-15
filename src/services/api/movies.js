import httpClient from "../../helpers/httpClient.js";

/* link https://developer.themoviedb.org/reference/discover-movie */
export function getMovies(filters = {}, page = 1) {
  console.log("getMovies");

  const params = {
    page,
  };
  console.log("params1", params);

  if (filters.genres?.length) {
    const filtersIds = filters.genres.join(",");

    params["with_genres"] = filtersIds;
  }
  if (filters.releaseYear) {
    params["primary_release_year"] = filters.releaseYear;
  }

  console.log("params2", params);

  return httpClient.get(`${process.env.VUE_APP_API_URL}/discover/movie`, {
    params,
  });
}

export function getMovieDetails(id) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/movie/${id}`);
}

export function searchMovies(searchText) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/search/movie`, {
    params: {
      query: searchText,
    },
  });
}

export function getGenreList() {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/genre/movie/list`);
}

export function getRelatedMovies(id) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/movie/${id}/similar`);
}

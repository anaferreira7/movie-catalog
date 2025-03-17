import httpClient from "../../helpers/httpClient.js";

/* link https://developer.themoviedb.org/reference/discover-movie */
export function getMovies({ page = 1, filters }) {
  console.log("getMovies");

  const params = {
    page,
  };

  if (filters.genres?.length) {
    const filtersIds = filters.genres.join(",");

    params["with_genres"] = filtersIds;
  }
  if (filters.releaseYear?.length) {
    params["primary_release_year"] = filters.releaseYear[0].year.toString();
  }
  if (filters.rating) {
    params["vote_average.gte"] = parseFloat(filters.rating);
  }

  console.log("final", filters, params);

  return httpClient.get(`${process.env.VUE_APP_API_URL}/discover/movie`, {
    params,
  });
}

export function getMovieDetails(id) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/movie/${id}`);
}

export function searchMovies({ searchText, page = 1 }) {
  const params = {
    page,
    query: searchText,
  };
  console.log("searchText", searchText);
  return httpClient.get(`${process.env.VUE_APP_API_URL}/search/movie`, {
    params,
  });
}

export function getGenreList() {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/genre/movie/list`);
}

export function getRelatedMovies(id) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/movie/${id}/similar`);
}

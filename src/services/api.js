import httpClient from "../helpers/httpClient.js";

/* link https://developer.themoviedb.org/reference/discover-movie */
export function getMovies(page = 1, filters = {}) {
  const params = {
    page,
  };

  if (!!filters.genres) {
    params.with_genres = filters.genres;
  }
  if (!!filters.releaseYear) {
    params.primary_release_year = filters.releaseYear;
  }
  if (!!filters.minRating) {
    params.vote_average_gte = filters.minRating;
  }
  if (!!filters.maxRating) {
    params.vote_average_lte = filters.maxRating;
  }

  return httpClient.get(`${process.env.VUE_APP_API_URL}/discover/movie`, {
    params,
  });
}

export function fetchMovieDetails(id) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/movie/${id}`);
}

export function searchMovies(searchText) {
  return httpClient.get(`${process.env.VUE_APP_API_URL}/search/movie`, {
    params: {
      query: searchText,
    },
  });
}

// export default getGenresMovieList

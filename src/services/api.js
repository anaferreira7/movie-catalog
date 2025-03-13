import httpClient from "../helpers/httpClient.js";

/* link https://developer.themoviedb.org/reference/discover-movie */
export const fetchMovies = async (page = 1, filters = {}) => {
  try {
    const params = {
      api_key: process.env.VUE_APP_API_KEY,
      page,
      sort_by: "popularity.desc",
    };

    if (!!filters.title) {
      params.title = filters.title;
    }
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

    const response = await httpClient.get(
      `${process.env.VUE_APP_API_URL}/discover/movie`,
      {
        params,
      }
    );

    // APi fetches by default 20 results per page
    const allResults = response.data.results;
    const totalPages = response.data.total_pages;
    const totalResults = response.data.total_results;

    // Calculate which results to display based on the current page
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    const resultsForCurrentPage = allResults.slice(startIndex, endIndex);

    return {
      results: resultsForCurrentPage,
      total_pages: totalPages,
      total_results: totalResults,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], total_pages: 0, total_results: 0 };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await httpClient.get(
      `${process.env.VUE_APP_API_URL}/movie/${id}`,
      {
        params: { api_key: process.env.VUE_APP_API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

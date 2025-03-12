import httpClient from "../helpers/httpClient.js";

export const fetchMovies = async (perPage = 10, page = 1) => {
  try {
    const response = await httpClient.get(
      `${process.env.VUE_APP_API_URL}/discover/movie`,
      {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          page,
          per_page: perPage,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], total_pages: 0, total_results: 0 };
  }
};

// export const fetchMovieDetails = async (id) => {
//     try {
//         const response = await httpClient.get(`${process.env.VUE_APP_API_URL}/movie/${id}`, {
//         params: { api_key: process.env.VUE_APP_API_KEY },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching movie details:', error);
//         return null;
//     }
// };

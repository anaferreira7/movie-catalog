import { getMovies, searchMovies } from "../../services/api/movies.js";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    genres: [],
  }),
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_GENRES(state, genres) {
      state.genres = genres;
    },
  },
  actions: {
    async fetchMovies({ commit }, filters = {}) {
      console.log("fetchMoviesStore", filters);

      // commit("SET_LOADING", true);
      getMovies(filters)
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
        })
        .catch((err) => {
          console.error(err);
        });
      // try {
      // } catch (error) {
      //   commit("SET_ERROR", error.message);
      // } finally {
      //   commit("SET_LOADING", false);
      // }
    },
    async searchMovies({ commit }, searchText) {
      searchMovies(searchText)
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
        })
        .catch((err) => {
          console.error("Something went wrong with the search", err);
        });
    },
  },
  getters: {
    getGenreName: (state) => (genreId) => {
      const genre = state.genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : "-";
    },
  },
};

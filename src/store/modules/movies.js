import {
  getMovies,
  searchMovies,
  getGenreList,
} from "../../services/api/movies.js";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    totalPages: 1,
    genres: [],
  }),
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_GENRES(state, genres) {
      state.genres = genres;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchMovies({ commit }, { filters = {}, page = 1 } = {}) {
      // commit("SET_LOADING", true);
      getMovies({ ...filters, page })
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
          commit("SET_TOTAL_PAGES", res.data.total_pages);
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
    async fetchGenres({ commit }) {
      // commit("SET_LOADING", true);
      getGenreList()
        .then((res) => {
          commit("SET_GENRES", res.data.genres);
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

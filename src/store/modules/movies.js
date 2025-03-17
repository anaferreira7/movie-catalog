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
    currentPage: 1,
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
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    async fetchMovies({ commit }, { filters = {}, page = 1 } = {}) {
      console.log("filters in fetchmovies", filters);

      // commit("SET_LOADING", true);
      getMovies({ filters, page })
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
          commit("SET_TOTAL_PAGES", res.data.total_pages);
          commit("SET_CURRENT_PAGE", res.data.page);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async fetchGenres({ commit }) {
      getGenreList()
        .then((res) => {
          commit("SET_GENRES", res.data.genres);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async searchMovies({ commit }, { searchText, page = 1 }) {
      searchMovies({ searchText, page })
        .then((res) => {
          commit("SET_MOVIES", res.data.results);
          commit("SET_TOTAL_PAGES", res.data.total_pages);
          commit("SET_CURRENT_PAGE", res.data.page);
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

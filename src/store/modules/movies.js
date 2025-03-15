import { getMovies } from "../../services/api/movies.js";

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
    async fetchMovies({ commit }) {
      // commit("SET_LOADING", true);
      getMovies()
        .then((res) => {
          console.log("Movies fetched:", res); // Debugging log
          commit("SET_MOVIES", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
      // try {
      // } catch (error) {
      //   commit("SET_ERROR", error.message);
      // } finally {
      //   commit("SET_LOADING", false);
      // }
    },
  },
  getters: {
    getGenreName: (state) => (genreId) => {
      const genre = state.genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : "-";
    },
  },
};

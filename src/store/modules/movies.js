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
  //   actions: {
  //     async fetchMovies({ commit }) {
  //       commit("SET_LOADING", true);
  //       try {
  //         const response = await axios.get("https://api.example.com/movies");
  //         commit("SET_MOVIES", response.data);
  //       } catch (error) {
  //         commit("SET_ERROR", error.message);
  //       } finally {
  //         commit("SET_LOADING", false);
  //       }
  //     },
  //   },
};

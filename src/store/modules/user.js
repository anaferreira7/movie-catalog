import { getFavoriteMovies } from "@/services/api/user";

export default {
  namespaced: true,
  state: () => ({
    favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies")) || [],
  }),
  mutations: {
    SET_FAVORITE_MOVIES(state, movies) {
      state.favoriteMovies = movies;
      localStorage.setItem("favoriteMovies", JSON.stringify(movies));
    },
    ADD_FAVORITE_MOVIE(state, movie) {
      if (!state.favoriteMovies.find((fav) => fav.id === movie.id)) {
        state.favoriteMovies.push(movie);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(state.favoriteMovies)
        );
      }
    },
    REMOVE_FAVORITE_MOVIE(state, movieId) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== movieId
      );
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(state.favoriteMovies)
      );
    },
  },
  actions: {
    async getUserPreferences({ commit }) {
      getFavoriteMovies()
        .then((res) => {
          if (!!res.data.results.length) {
            commit("SET_FAVORITE_MOVIES", res.data.results);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  getters: {
    isFavorite: (state) => (movieId) =>
      state.favoriteMovies.find((movie) => movie.id === movieId),
  },
};

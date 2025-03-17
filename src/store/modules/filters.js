export default {
  namespaced: true,
  state: {
    genres: [],
    releaseYear: [],
    rating: null,
  },
  mutations: {
    setFilters(state, filters) {
      state.genres = filters.genres || [];
      state.releaseYear = filters.releaseYear || [];
      state.rating = filters.rating || null;
    },
    resetFilters(state) {
      state.genres = [];
      state.releaseYear = [];
      state.rating = null;
    },
  },
  actions: {
    async updateFilters({ commit, dispatch }, filters) {
      commit("setFilters", filters);
      dispatch("movies/fetchMovies", { filters }, { root: true });
    },

    resetFilters({ commit }) {
      commit("resetFilters");
    },
  },
  getters: {},
};

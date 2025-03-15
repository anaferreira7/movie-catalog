export default {
  namespaced: true,
  state: {
    genres: [],
    releaseYear: null,
  },
  mutations: {
    setFilters(state, filters) {
      state.genres = filters.genres || [];
      state.releaseYear = filters.releaseYear || null;
    },
    resetFilters(state) {
      state.genres = [];
      state.releaseYear = null;
    },
  },
  actions: {
    async updateFilters({ commit, dispatch }, filters) {
      await dispatch("movies/fetchMovies", filters, { root: true });
      commit("setFilters", filters);
    },

    resetFilters({ commit }) {
      commit("resetFilters");
    },
  },
  getters: {},
};

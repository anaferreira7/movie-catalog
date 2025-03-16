export default {
  namespaced: true,
  state: {
    genres: [],
    releaseYear: null,
    rating: null,
  },
  mutations: {
    setFilters(state, filters) {
      state.genres = filters.genres || [];
      state.releaseYear = filters.releaseYear || null;
      state.rating = filters.rating || null;
    },
    resetFilters(state) {
      state.genres = [];
      state.releaseYear = null;
      state.rating = null;
    },
  },
  actions: {
    async updateFilters({ commit, dispatch }, filters) {
      console.log("updateFiltersStore", filters);
      await dispatch("movies/fetchMovies", { filters }, { root: true });
      commit("setFilters", filters);
    },

    resetFilters({ commit }) {
      commit("resetFilters");
    },
  },
  getters: {},
};

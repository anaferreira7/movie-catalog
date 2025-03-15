export default {
  namespaced: true,
  state: {
    genres: [],
    releaseYears: null,
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
    updateFilters({ commit }, filters) {
      commit("setFilters", filters);
    },
    resetFilters({ commit }) {
      commit("resetFilters");
    },
  },
  getters: {},
};

export default {
  state: () => ({
    username: null,
    sessionId: null,
    favoriteMovies: [],
  }),
  mutations: {
    SET_USERNAME(state, user) {
      state.user = user;
    },
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId;
    },
    SET_FAVORITE_MOVIES(state, movies) {
      state.favoriteMovies = movies;
    },
  },
  actions: {
    // async fetchFavoriteMovies({ commit, state }) {
    //   if (!state.sessionId && !state.guestSessionId) return;
    //   try {
    //     const sessionType = state.sessionId
    //       ? `session_id=${state.sessionId}`
    //       : `guest_session_id=${state.guestSessionId}`;
    //     const response = await axios.get(
    //       `${BASE_URL}/account/{account_id}/favorite/movies?api_key=${API_KEY}&${sessionType}`
    //     );
    //     commit("SET_FAVORITE_MOVIES", response.data.results);
    //   } catch (error) {
    //     commit("SET_ERROR", error.message);
    //   }
    // },
  },
  getters: {
    currentUser: (state) => state.user,
    guestSession: (state) => state.guestSessionId,
    favoriteMovies: (state) => state.favoriteMovies,
  },
};

import { createStore } from "vuex";
import movies from "./modules/movies";
import userPreferences from "./modules/userPreferences";
import filters from "./modules/filters";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { movies, userPreferences, filters },
});

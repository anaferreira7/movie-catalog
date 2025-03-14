import { createStore } from "vuex";
import movies from "./modules/movies";
import user from "./modules/user";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { movies, user },
});

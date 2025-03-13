import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "movies" },
  },
  {
    path: "/movies",
    name: "movies",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Movies.vue"),
  },
  {
    path: "/movie/:id",
    name: "movieDetails",
    component: () =>
      import(
        /* webpackChunkName: "movie-details" */ "../views/MovieDetails.vue"
      ),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

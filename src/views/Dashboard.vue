<template>
  <div class="px-6 py-4">
    <Title text="Dashboard" />
    <div class="mt-2 flex flex-wrap gap-4 mx-auto w-fit">
      <MovieCard
        :movie="movie"
        v-for="movie in movies"
        :key="movie.id"
        class="w-40"
      />
    </div>
  </div>
</template>
<script>
import Title from "@/components/utils/Title.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchMovies } from "../services/api.js";

export default {
  name: "DashboardView",
  components: { Title, MovieCard },
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    const movieData = await fetchMovies({});
    this.movies = movieData.results;
  },
};
</script>

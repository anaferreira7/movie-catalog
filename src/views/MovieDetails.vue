<template>
  <div class="movie-detail" v-if="movie">
    <h1>{{ movie.title }}</h1>
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      alt="movie poster"
    />
    <p>{{ movie.overview }}</p>
    <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
    <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
  </div>
</template>

<script>
import { fetchMovieDetails } from "../services/api.js";

export default {
  props: ["id"],

  data() {
    return {
      movie: null,
    };
  },
  async created() {
    this.movie = await fetchMovieDetails(this.id);
  },
};
</script>

<style scoped>
.movie-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.movie-detail img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>

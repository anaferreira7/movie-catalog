<template>
  <router-link :to="`/movie/${movie.id}`" :key="movie.id">
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      alt="movie poster"
      class="h-auto rounded-xl"
    />
    <h3>{{ movie.title }}</h3>
  </router-link>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      required: true,
    },
  },
};
</script>

<template>
  <div
    v-if="movies.length > 0"
    class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6"
  >
    <router-link
      v-for="movie in movies"
      :key="movie.id"
      :to="{ name: 'movieDetails', params: { id: movie.id } }"
      class="rounded-xl relative"
      @click.stop
    >
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        alt="Movie poster"
        class="w-full h-auto object-cover rounded-md mb-4"
      />
      <AddToFav :movie="movie" class="absolute z-[1] top-0 right-0" />
      <div
        class="[background-image:linear-gradient(to_top,black_15%,transparent_100%)] absolute bottom-0 left-0 w-full h-full px-4 pb-4 flex flex-col justify-end"
      >
        <h3 class="font-medium text-lg">{{ movie.title }}</h3>
        <p class="text-gray-600 text-sm">
          {{ $getYearFromStringDate(movie.release_date) }}
        </p>
        <p class="text-xs text-gray-600 flex flex-wrap gap-x-1">
          <span v-for="genreId in movie.genre_ids.slice(0, 3)" :key="genreId">
            {{ getGenreName(genreId) }}
          </span>
        </p>
      </div>
    </router-link>
  </div>

  <p v-else class="text-center text-lg">No movies found.</p>
</template>
<script>
import AddToFav from "@/components/AddToFavButton.vue";

export default {
  name: "MoviesGrid",
  props: {
    movies: {
      required: true,
      type: Array,
    },
  },
  components: {
    AddToFav,
  },
  data() {
    return {
      selectedGenres: [],
    };
  },
  computed: {
    getGenreName() {
      return this.$store.getters["movies/getGenreName"];
    },
  },
};
</script>

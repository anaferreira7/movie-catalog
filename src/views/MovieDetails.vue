<template>
  <div v-if="movie">
    <div class="relative min-h-[80vh] overflow-hidden py-8">
      <img
        class="hidden sm:absolute blur-md w-full h-full object-cover object-center"
        :src="imgsUrl + movie.backdrop_path"
        alt=""
      />
      <div
        class="overlay sm:absolute z-[0] inset-0 bg-[#1B1820] opacity-80"
      ></div>
      <div
        class="sm:absolute z-[1] inset-0 w-full sm:pt-16 px-10 max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-x-14"
      >
        <img
          :src="imgsUrl + movie.poster_path"
          alt="movie poster"
          class="w-64 h-fit rounded-lg mx-auto sm:mx-0"
        />

        <div class="mt-4 sm:mt-0">
          <div class="flex justify-between">
            <h1 class="text-3xl">{{ movie.title }}</h1>
            <AddToFav :movie="movie" />
          </div>
          <div class="flex gap-x-6">
            <p>{{ $getYearFromStringDate(movie.release_date) }}</p>
            <div class="flex items-center gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#f5c518"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p>
                <strong>{{ movie.vote_average }}</strong>
                <span class="text-xs text-gray-400"> / 10</span>
              </p>
            </div>
          </div>
          <p class="mt-1">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
    <h2 v-if="relatedMovies" class="text-xl font-medium px-6 mt-6 py-4">
      Related Movies
    </h2>

    <div
      v-if="relatedMovies"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6 pb-6"
    >
      <button
        v-for="movie in relatedMovies.splice(0, 10)"
        :key="movie.id"
        @click="goToRelated(movie.id)"
        class="rounded-xl relative overflow-hidden shadow-md shadow-black"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          alt="Movie poster"
          class="w-full h-auto object-cover rounded-md mb-4"
        />
        <AddToFav :movie="movie" class="absolute z-[1] top-0 right-0" />
        <div
          class="[background-image:linear-gradient(to_top,black_15%,transparent_100%)] absolute bottom-0 left-0 w-full h-full px-4 pb-4 flex flex-col justify-end items-start"
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
      </button>
    </div>
  </div>
</template>

<script>
import { getMovieDetails, getRelatedMovies } from "@/services/api/movies.js";
import AddToFav from "@/components/AddToFavButton.vue";

export default {
  components: { AddToFav },

  data() {
    return {
      id: this.$route.params.id,
      movie: null,
      relatedMovies: null,
      imgsUrl:
        process.env.VUE_APP_IMAGES_URL || "https://image.tmdb.org/t/p/w500", //TODO env not working
    };
  },
  computed: {
    getGenreName() {
      return this.$store.getters["movies/getGenreName"];
    },
  },
  async created() {
    this.getMovieData(this.id);
  },
  methods: {
    goToRelated(id) {
      this.getMovieData(id);
      this.$router.replace({ params: { id } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async getMovieData(id) {
      try {
        const [movieData, relatedMoviesData] = await Promise.all([
          getMovieDetails(id),
          getRelatedMovies(id),
        ]);

        this.movie = movieData.data;
        this.relatedMovies = relatedMoviesData.data.results;
      } catch (err) {
        console.error("Error fetching movie data or related movies:", err);
      }
    },
  },
};
</script>

<style scoped></style>

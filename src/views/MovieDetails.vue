<template>
  <div v-if="movie">
    <div class="relative min-h-[400px] h-[80vh] overflow-hidden py-8 -mt-4">
      <img
        class="absolute blur-md w-full h-full object-cover object-center"
        :src="imgsUrl + movie.backdrop_path"
        alt=""
      />
      <div class="overlay absolute z-[0] inset-0 bg-[#1B1820] opacity-80"></div>
      <div
        class="absolute z-[1] inset-0 w-full pt-16 px-10 max-w-[1200px] mx-auto flex gap-x-14"
      >
        <img
          :src="imgsUrl + movie.poster_path"
          alt="movie poster"
          class="w-64 h-fit rounded-lg"
        />

        <div>
          <div class="flex justify-between">
            <h1 class="text-3xl">{{ movie.title }}</h1>
            <AddToFav />
          </div>
          <div class="flex gap-x-6">
            <p>{{ getYearFromStringDate(movie.release_date) }}</p>
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
    <div v-if="relatedMovies" class="grid grid-cols-6 gap-3">
      <div v-for="movie in relatedMovies" :key="movie.id">
        <img
          :src="imgsUrl + movie.poster_path"
          alt="movie poster"
          class="w-42 rounded"
        />
        <h3>
          {{ movie.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieDetails, getRelatedMovies } from "../services/api/movies.js";
import AddToFav from "@/components/AddToFav.vue";

export default {
  props: ["id"],
  components: { AddToFav },

  data() {
    return {
      movie: null,
      relatedMovies: null,
      imgsUrl:
        process.env.VUE_APP_IMAGES_URL || "https://image.tmdb.org/t/p/w500", //TODO env not working
    };
  },
  async created() {
    try {
      const [movieData, relatedMoviesData] = await Promise.all([
        getMovieDetails(this.id),
        getRelatedMovies(this.id),
      ]);

      this.movie = movieData.data;
      this.relatedMovies = relatedMoviesData.data.results;
    } catch (err) {
      console.error("Error fetching movie data or related movies:", err);
    }
  },
  methods: {
    getYearFromStringDate(string) {
      return new Date(string).getFullYear();
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="px-6 py-4">
    <!-- <Filters @update-filters="updateFiltersHandler" /> -->

    <!-- Movies per Page Dropdown -->
    <!-- <div class="mb-4">
      <label for="moviesPerPage" class="text-lg">Movies per page:</label>
      <select
        id="moviesPerPage"
        v-model="perPage"
        class="ml-2 p-2 border bg-gray-700 border-gray-300 rounded"
      >
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </div> -->

    <!-- <GenreList @genresSelected="handleGenresSelection" /> -->

    <!-- Movie list -->
    <div v-if="movies.length > 0">
      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <router-link
          v-for="movie in movies"
          :key="movie.id"
          :to="{ name: 'movieDetails', params: { id: movie.id } }"
          class="rounded-xl relative"
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
              <span v-for="genreId in movie.genre_ids" :key="genreId">
                {{ getGenreName(genreId) }}
              </span>
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- No movies message -->
    <div v-else>
      <p class="text-center text-lg">No movies found.</p>
    </div>
  </div>
</template>

<script>
import { getGenreList } from "../services/index.js";
// import GenreList from "@/components/GenreList.vue";

import AddToFav from "@/components/AddToFavButton.vue";
// import Filters from "@/components/Filters.vue";

export default {
  name: "MoviesView",
  components: {
    AddToFav,
    /* GenreList,*/
    /*Filters*/
  },
  data() {
    return {
      selectedGenres: [],
      perPage: 10,
      // currentPage: 1,
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
    getGenreName() {
      return this.$store.getters["movies/getGenreName"];
    },
  },
  watch: {
    "$route.query.search": function (val) {
      if (val) {
        this.$store.dispatch("movies/searchMovies", val);
      } else {
        this.$store.dispatch("movies/fetchMovies");
      }
    },
  },

  async created() {
    this.$store.dispatch("movies/fetchMovies");
    // this.fetchMovies();
    this.fetchGenreList();
  },

  methods: {
    async fetchGenreList() {
      getGenreList().then((res) => {
        this.$store.commit("movies/SET_GENRES", res.data.genres);
        this.genres = res.data.genres;
      });
    },
    // handleGenresSelection(genres) {
    //   this.selectedGenres = genres; // Update the selected genres
    //   // You can trigger a search or filter based on the selected genres
    // },
    // async updateFiltersHandler(filters) {
    //   const movieData = await getMovies(this.currentPage, filters);
    //   this.movies = movieData.results;
    //   this.totalPages = movieData.total_pages;
    // },
    // async loadPage(page) {
    //   this.currentPage = page;
    //   await this.updateFiltersHandler();
    // },
    // changePerPage() {
    //   this.currentPage = 1; // Reset to the first page when changing items per page
    //   this.updateFiltersHandler();
    // },
  },
};
</script>

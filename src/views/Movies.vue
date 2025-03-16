<template>
  <div class="px-6 py-4 space-y-6">
    <!-- Display Active Search Query -->
    <div
      v-if="$route.query.search"
      class="bg-black text-white px-4 pt-2 pb-3 rounded-xl shadow-xl mb-4"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-lg uppercase font-semibold">Search Results</h3>
        <button
          @click="clearSearch"
          class="text-sm text-gray-400 hover:text-white transition duration-200 flex items-center"
        >
          Clear Search
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400 hover:text-red-500 transition duration-200 ml-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p class="text-sm mt-2">
        🔍 Showing results for: <strong>{{ $route.query.search }}</strong>
      </p>
    </div>

    <!-- Display Active Filters -->
    <div
      v-if="hasFilters"
      class="bg-black text-white px-4 pt-2 pb-3 rounded-xl shadow-xl mb-4"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-lg uppercase font-semibold">Applied Filters</h3>
        <button
          @click="resetFilters"
          class="text-sm text-gray-400 hover:text-white transition duration-200 flex items-center"
        >
          Clear Filters
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5 text-gray-400 hover:text-red-500 transition duration-200 ml-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-wrap gap-3 text-sm mt-2">
        <span
          v-if="this.$store.state.filters.genres"
          class="px-3 py-1 bg-gray-800 rounded-lg"
        >
          🎭 Genres: <strong>{{ genreNames.join(", ") }}</strong>
        </span>
        <span
          v-if="$store.state.filters.releaseYear"
          class="px-3 py-1 bg-gray-800 rounded-lg"
        >
          📅 Release Year: <strong>{{ filters.releaseYear }}</strong>
        </span>
        <span
          v-if="this.$store.state.filters.rating"
          class="px-3 py-1 bg-gray-800 rounded-lg"
        >
          <span class="text-yellow-400">★</span> Rating:
          <strong>{{ this.$store.state.filters.rating }}</strong>
        </span>
      </div>
    </div>

    <!-- Movies Grid -->
    <Title text="Movies" />
    <MoviesGrid :movies="$store.state.movies.movies" />

    <!-- Pagination -->
    <div class="flex justify-center">
      <Pagination
        :currentPage="currentPage"
        :totalPages="$store.state.movies.totalPages"
        @update:currentPage="updatePage"
      />
    </div>
  </div>
</template>

<script>
import MoviesGrid from "@/components/MoviesGrid.vue";
import Pagination from "@/components/utils/Pagination.vue";
import Title from "@/components/utils/Title.vue";
import { mapGetters } from "vuex";

export default {
  name: "MoviesView",
  components: {
    MoviesGrid,
    Pagination,
    Title,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters("movies", ["getGenreName"]),
    hasFilters() {
      return (
        this.$store.state.filters.genres.length > 0 ||
        this.$store.state.filters.releaseYear !== null ||
        this.$store.state.filters.rating !== null
      );
    },
    genreNames() {
      return this.$store.state.movies.genres.map((genreId) =>
        this.getGenreName(genreId)
      );
    },
  },
  async created() {
    this.fetchMovies({ page: this.currentPage });
    this.$store.dispatch("movies/fetchGenres");
  },
  methods: {
    fetchMovies(params) {
      if (this.hasFilters) {
        params.filters = this.$store.state.filters;
      }
      this.$store.dispatch("movies/fetchMovies", {
        filters: this.$store.state.filters,
      });
    },
    updatePage(newPage) {
      this.currentPage = newPage;
      this.fetchMovies({ page: newPage, searchText: this.$route.query.search });
    },
    resetFilters() {
      this.$store.dispatch("filters/resetFilters");
      this.fetchMovies({ page: 1 });
      this.currentPage = 1;
    },
    clearSearch() {
      this.$router.replace({ query: {} });
    },
  },
};
</script>

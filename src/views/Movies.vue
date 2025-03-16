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

    <MoviesGrid :movies="$store.state.movies.movies" />
    <Pagination />
  </div>
</template>

<script>
import MoviesGrid from "@/components/MoviesGrid.vue";
import Pagination from "@/components/utils/Pagination.vue";

export default {
  name: "MoviesView",
  components: {
    MoviesGrid,
    Pagination,
  },
  data() {
    return {};
  },
  computed: {},
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
    this.$store.dispatch("movies/fetchGenres");
  },

  methods: {},
};
</script>

<template>
  <div class="px-6 py-4">
    <MoviesGrid :movies="$store.state.movies.movies" />

    <Pagination
      :currentPage="currentPage"
      :totalPages="$store.state.movies.totalPages"
      :perPage="perPage"
      @update:currentPage="updatePage"
    />
    <!-- @update:perPage="updatePerPage" -->
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
    return {
      currentPage: 1,
      // perPage: 10,
    };
  },
  watch: {
    // perPage() {
    //   this.currentPage = 1; // Reset to first page when changing perPage
    //   this.fetchMovies();
    // },
    "$route.query.search"(val) {
      if (val) {
        this.$store.dispatch("movies/searchMovies", val);
      } else {
        this.fetchMovies();
      }
    },
  },
  methods: {
    fetchMovies() {
      this.$store.dispatch("movies/fetchMovies", {
        page: this.currentPage,
        // perPage: this.perPage,
      });
    },
    updatePage(newPage) {
      this.currentPage = newPage;
      this.fetchMovies();
    },
    // updatePerPage(newPerPage) {
    //   this.perPage = newPerPage;
    // },
  },
  async created() {
    this.fetchMovies();
    this.$store.dispatch("movies/fetchGenres");
  },
};
</script>

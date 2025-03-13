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

    <!-- Movie list -->
    <div v-if="movies.length > 0">
      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <router-link
          v-for="movie in movies"
          :key="movie.id"
          :to="{ name: 'movieDetails', params: { id: movie.id } }"
          class="bg-black p-4"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt="Movie poster"
            class="w-full h-auto object-cover rounded mb-4"
          />
          <h3 class="font-medium text-lg">{{ movie.title }}</h3>
          <p class="text-gray-600">{{ movie.release_date }}</p>
          <!-- <p
            v-for="genreId in movie.genre_ids"
            :key="genreId"
            class="text-gray-600"
          >
            {{ getGenreName(genreId) }}
          </p> -->
        </router-link>
      </div>

      <!-- Pagination -->
      <!-- <div class="flex justify-center mt-6 space-x-2">
        <button
          v-if="currentPage > 1"
          @click="loadPage(currentPage - 1)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="loadPage(page)"
          :class="[
            'px-4 py-2 border rounded',
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500',
          ]"
        >
          {{ page }}
        </button>

        <button
          v-if="currentPage < totalPages"
          @click="loadPage(currentPage + 1)"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div> -->
    </div>

    <!-- No movies message -->
    <div v-else>
      <p class="text-center text-lg">No movies found.</p>
    </div>
  </div>
</template>

<script>
import { getMovies } from "../services/api.js";
// import Filters from "@/components/Filters.vue";

export default {
  name: "MoviesView",
  components: {
    /*Filters*/
  },
  data() {
    return {
      movies: [],
      perPage: 10,
      // currentPage: 1,
    };
  },

  async created() {
    try {
      const res = await getMovies();
      this.movies = res.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  },

  methods: {
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

<template>
  <div class="px-6 py-4">
    <Title text="Dashboard" />

    <Filters @update-filters="updateFiltersHandler" />

    <!-- Movies per Page Dropdown -->
    <div class="mb-4">
      <label for="moviesPerPage" class="text-lg">Movies per page:</label>
      <select
        id="moviesPerPage"
        v-model="perPage"
        @change="changePerPage"
        class="ml-2 p-2 border bg-gray-700 border-gray-300 rounded"
      >
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </div>

    <!-- Movie list -->
    <div v-if="filteredMovies.length > 0">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <router-link
          v-for="movie in movies"
          :key="movie.id"
          :to="{ name: 'movieDetails', params: { id: movie.id } }"
          class="border border-gray-300 rounded shadow-lg p-4 block"
        >
          <div>
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              alt="Movie poster"
              class="w-full h-auto object-cover rounded mb-4"
            />
            <h3 class="font-bold text-lg">{{ movie.title }}</h3>
            <p class="text-gray-600">{{ movie.release_date }}</p>
          </div>
        </router-link>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-6 space-x-2">
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
      </div>
    </div>

    <!-- No movies message -->
    <div v-else>
      <p class="text-center text-lg">No movies found.</p>
    </div>
  </div>
</template>

<script>
import { fetchMovies } from "../services/api.js";
import Title from "@/components/utils/Title.vue";
import Filters from "@/components/Filters.vue";

export default {
  name: "DashboardView",
  components: { Title, Filters },
  data() {
    return {
      movies: [],
      perPage: 10,
      currentPage: 1,
    };
  },

  async created() {
    const movieData = await fetchMovies(this.currentPage, this.filters);
    this.movies = movieData.results;
  },

  methods: {
    async updateFiltersHandler(filters) {
      const movieData = await fetchMovies(this.currentPage, filters);
      this.movies = movieData.results;
      this.totalPages = movieData.total_pages;
    },
    async loadPage(page) {
      this.currentPage = page;
      await this.applyFilters();
    },
    changePerPage() {
      this.currentPage = 1; // Reset to the first page when changing items per page
      this.applyFilters();
    },
  },
};
</script>

<template>
  <!-- Filters Section -->
  <div class="mb-6 flex gap-x-6">
    <!-- Search by Title -->
    <div class="mb-4">
      <label for="search" class="text-lg">Search Title:</label>
      <input
        type="text"
        id="search"
        v-model="filters.title"
        @input="updateFilters"
        class="ml-2 p-2 border bg-gray-700 border-gray-300 rounded"
        placeholder="Type movie title..."
      />
    </div>
    <!-- Genres Filter -->
    <div class="w-fit">
      <label for="genres" class="">Genres:</label>
      <select
        id="genres"
        v-model="filters.genres"
        class="ml-2 px-2 py-0.5 border bg-gray-700 border-gray-300 rounded"
      >
        <option value="">Select Genre</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="10749">Romance</option>
        <!-- Add more genres as needed -->
      </select>
    </div>

    <!-- Release Year Filter -->
    <div class="w-fit">
      <label for="releaseYear" class="">Release Year:</label>
      <input
        type="number"
        id="releaseYear"
        v-model="filters.releaseYear"
        class="ml-2 px-2 py-0.5 border bg-gray-700 border-gray-300 rounded"
        placeholder="Enter year"
      />
    </div>

    <!-- Rating Filter -->
    <div class="w-fit">
      <label for="rating" class="">Rating:</label>
      <div class="flex gap-4">
        <input
          type="number"
          id="minRating"
          v-model="filters.minRating"
          class="px-2 py-0.5 border bg-gray-700 border-gray-300 rounded"
          placeholder="Min"
          step="0.1"
          min="0"
          max="10"
        />
        <input
          type="number"
          id="maxRating"
          v-model="filters.maxRating"
          class="px-2 py-0.5 border bg-gray-700 border-gray-300 rounded"
          placeholder="Max"
          step="0.1"
          min="0"
          max="10"
        />
      </div>
    </div>

    <!-- Apply Filters Button -->
    <button
      @click="updateFilters"
      class="px-2 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Apply Filters
    </button>
  </div>
</template>

<script>
export default {
  name: "FiltersComp",

  data() {
    return {
      filters: {
        title: "",
        genres: "",
        releaseYear: "",
        minRating: "",
        maxRating: "",
      },
    };
  },
  methods: {
    updateFilters() {
      this.$emit("updateFilters", this.filters);
    },
  },
};
</script>

<style></style>

<template>
  <div
    class="fixed top-0 right-0 w-[325px] h-screen z-[2] bg-black py-4 px-6 text-white"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl uppercase font-semibold">Advanced Search</h2>
      <button @click="closeFiltersComp">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-400 hover:text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Genre Dropdown -->
    <div class="mb-6">
      <p class="font-medium">Genre:</p>
      <DropdownSelect
        v-model="filters.genres"
        :items="$store.state.movies.genres"
        labelKey="name"
        valueKey="id"
        multiple
        placeholder="Select Genres"
        class="mt-2"
      />
    </div>

    <!-- Release Year Dropdown -->
    <div class="mb-6">
      <p class="font-medium">Release Year:</p>
      <DropdownSelect
        v-model="filters.releaseYear"
        :items="availableYears"
        labelKey="year"
        valueKey="year"
        :multiple="false"
        placeholder="Select Release Year"
        class="mt-2"
      />
    </div>

    <!-- Rating Stars -->
    <div class="mb-6">
      <p class="font-medium">
        Rating:
        <span v-if="filters.rating" class="ml-1 text-white font-bold">{{
          filters.rating
        }}</span>
      </p>
      <div class="flex gap-x-1">
        <button
          v-for="star in 10"
          :key="star"
          :title="star"
          @click="setRating(star)"
          @mouseover="hoverRating(star)"
          @mouseleave="clearHover"
          :class="[
            'text-2xl',
            {
              'text-yellow-400': star <= filters.rating,
              'text-gray-400': star > filters.rating,
              'cursor-pointer': true,
            },
          ]"
        >
          ★
        </button>
      </div>
    </div>

    <!-- Apply Filters Button -->
    <button
      @click="updateFilters"
      class="w-full py-2 bg-[#BA64FE] text-white rounded-md hover:bg-[#9d47c0] transition duration-200"
    >
      Apply Filters
    </button>
  </div>
</template>

<script>
import DropdownSelect from "@/components/utils/DropdownSelect.vue";

export default {
  name: "FiltersComp",
  emits: ["close"],
  components: { DropdownSelect },
  data() {
    return {
      filters: {
        genres: [],
        releaseYear: null,
        rating: null,
      },
      availableYears: this.generateYears(),
    };
  },
  methods: {
    setRating(rating) {
      this.filters.rating = rating;
    },
    hoverRating(rating) {
      this.hoveredRating = rating;
    },
    clearHover() {
      this.hoveredRating = null;
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 1900;
      const years = [];
      for (let year = currentYear; year >= startYear; year--) {
        years.push({ year });
      }
      return years;
    },

    async updateFilters() {
      if (this.filters.genres.length) {
        this.filters.genres = this.filters.genres.map((genre) => genre.id);
      }
      if (this.filters.releaseYear) {
        this.filters.releaseYear = this.filters.releaseYear.year;
      }
      console.log("updateFilters", this.filters);

      await this.$store.dispatch("filters/updateFilters", this.filters);
      this.$router.push({ name: "movies" });
      this.closeFiltersComp();
    },
    closeFiltersComp() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Additional styling for consistent UI */
button {
  outline: none;
  border: none;
  cursor: pointer;
}

button:focus {
  outline: none;
}

button:hover {
  opacity: 0.9;
}
</style>

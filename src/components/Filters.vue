<template>
  <div class="fixed top-0 right-0 w-[325px] h-screen z-[2] bg-black py-4 px-6">
    <div class="flex justify-between mb-4">
      <h2 class="uppercase">Advanced Search</h2>
      <button @click="closeFiltersComp">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <p>Genre:</p>
    <DropdownSelect
      v-model="filters.genres"
      :items="$store.state.movies.genres"
      labelKey="name"
      valueKey="id"
      multiple
      placeholder="Select Genres"
    />

    <p class="mt-6">Release Year:</p>
    <DropdownSelect
      v-model="filters.releaseYear"
      :items="availableYears"
      labelKey="year"
      valueKey="year"
      :multiple="false"
      placeholder="Select Release Year"
    />

    <p class="mt-6">Rating:</p>
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
    <span v-if="filters.rating" class="ml-2 text-xl text-white">{{
      filters.rating
    }}</span>

    <button
      @click="updateFilters"
      class="mt-20 px-2 py-0.5 border border-[#BA64FE] text-white rounded hover:bg-[#BA64FE]"
    >
      Apply Filters
    </button>
  </div>
</template>

<script>
import DropdownSelect from "@/components/utils/DropdownSelect.vue";
// import Movies from "@/views/Movies.vue";

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
      availableYears: this.generateYears(), //TODO improve so it doesnt run everytime the component is mounted
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

      // Update the filter data in the Vuex store
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

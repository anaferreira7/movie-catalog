<template>
  <div class="w-full sm:w-[300px] flex flex-col justify-end mt-4">
    <!-- Search Input -->
    <div
      class="bg-black rounded-full overflow-hidden flex items-center px-4 border border-transparent focus-within:border-[#BA64FE] transition"
    >
      <input
        type="text"
        id="search"
        v-model="searchText"
        @input="searchDebounce"
        class="p-2 bg-transparent flex-1 focus:outline-none"
        placeholder="Type movie title..."
        aria-label="Search movies"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 hover:stroke-[#BA64FE]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>

    <!-- Advanced Search Button -->
    <button
      @click="openFiltersComp"
      class="text-sm text-gray-400 text-center sm:text-right mt-1"
      :aria-expanded="isFiltersOpen.toString()"
    >
      Advanced search
    </button>

    <!-- Filters Component (conditionally rendered) -->
    <Filters v-if="isFiltersOpen" @close="closeFiltersHandler" />
  </div>
</template>

<script>
import Filters from "@/components/Filters.vue";

export default {
  name: "SearchComp",
  components: { Filters },

  data() {
    return {
      searchText: this.$route.query.search ? this.$route.query.search : "",
      debounceTimeout: null,
      isFiltersOpen: false,
    };
  },

  watch: {
    "$route.query.search": async function (val) {
      if (val) {
        console.log("Search movies in Search");
        this.$store.commit("filters/resetFilters");
        await this.$store.dispatch("movies/searchMovies", { searchText: val });
        if (this.$route.name !== "movies") {
          this.$router.push({ name: "movies", query: { search: val } });
        }
      } else {
        this.searchText = "";
        console.log("Fetch movies in Search");
        this.$store.dispatch("movies/fetchMovies");
      }
    },
  },

  methods: {
    // Close the filters component
    closeFiltersHandler() {
      this.isFiltersOpen = false;
    },

    // Open the filters component
    openFiltersComp() {
      this.isFiltersOpen = true;
    },

    // Search debouncing
    searchDebounce() {
      clearTimeout(this.debounceTimeout); // Clear any previous debounce timeout

      this.debounceTimeout = setTimeout(() => {
        if (this.searchText.trim() === "") {
          if (this.$route.query.search) {
            this.$router.replace({ query: {} }); // Use replace to avoid unnecessary history entries
          }
          return;
        }
        this.$router.replace({ query: { search: this.searchText } }); // Replace the query
      }, 500); // 500ms delay for debounce
    },
  },
};
</script>

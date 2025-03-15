<template>
  <div class="w-[300px] flex flex-col justify-end pt-4">
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
    <button
      @click="openFiltersComp"
      class="text-sm text-gray-400 text-right mt-1"
    >
      Advanced search
    </button>
    <Filters v-if="isFiltersOpen" @close="closeFiltersHandler" />
  </div>
</template>

<script>
import Filters from "@/components/Filters.vue";
export default {
  name: "SearchComp",
  components: { Filters },
  emits: ["updateSearch"],

  data() {
    return {
      searchText: "",
      debounceTimeout: null,
      isFiltersOpen: false,
    };
  },

  methods: {
    closeFiltersHandler() {
      this.isFiltersOpen = false;
    },

    openFiltersComp() {
      this.isFiltersOpen = true;
    },
    searchDebounce() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        if (this.searchText.trim() === "") {
          if (this.$route.query.search) this.$router.push({ query: {} });
          return;
        }
        this.$router.push({ query: { search: this.searchText } });
        console.log(1, this.searchText);
      }, 500); // 500ms delay for debounce
    },
  },
};
</script>

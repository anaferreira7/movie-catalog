<template>
  <div
    class="flex justify-between items-center p-4 bg-gray-800 text-white rounded"
  >
    <!-- Page Navigation -->
    <div class="flex items-center space-x-2">
      <button
        @click="changePage(1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        First
      </button>

      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span v-for="page in visiblePages" :key="page">
        <button
          @click="changePage(page)"
          :class="[
            'px-3 py-1 rounded',
            page === currentPage ? 'bg-blue-500' : 'bg-gray-700',
          ]"
        >
          {{ page }}
        </button>
      </span>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>

      <button
        @click="changePage(totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>

    <!-- Movies Per Page Dropdown -->
    <!-- <div>
      <label for="perPage" class="mr-2">Movies per page:</label>
      <select
        id="perPage"
        v-model="moviesPerPage"
        @change="updateMoviesPerPage"
        class="p-2 bg-gray-700 border border-gray-500 rounded"
      >
        <option
          v-for="option in [10, 20, 30, 50]"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "PaginationComp",
  props: {
    currentPage: Number,
    totalPages: Number,
    // perPage: Number,
  },
  computed: {
    visiblePages() {
      const pages = [];
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, this.currentPage + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    // moviesPerPage: {
    //   get() {
    //     return this.perPage;
    //   },
    //   set(value) {
    //     this.$emit("update:perPage", Number(value));
    //   },
    // },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("update:currentPage", page);
      }
    },
    // updateMoviesPerPage() {
    //   this.$emit("update:perPage", this.moviesPerPage);
    // },
  },
};
</script>

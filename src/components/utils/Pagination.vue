<template>
  <!-- Page Navigation -->
  <div class="flex items-center justify-center space-x-2 mt-4">
    <button
      @click="changePage(1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-full border border-[#BA64FE] text-white transition duration-200 ease-in-out hover:bg-[#BA64FE] hover:border-[#BA64FE] disabled:opacity-50"
    >
      &lt;&lt;
    </button>

    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-full border border-[#BA64FE] text-white transition duration-200 ease-in-out hover:bg-[#BA64FE] hover:border-[#BA64FE] disabled:opacity-50"
    >
      &lt;
    </button>

    <span v-for="page in visiblePages" :key="page">
      <button
        @click="changePage(page)"
        :class="[
          'px-4 py-2 rounded-full border transition duration-200 ease-in-out',
          page === currentPage
            ? 'bg-[#BA64FE] border-[#BA64FE]'
            : 'border-[#BA64FE] text-white hover:bg-[#BA64FE]',
        ]"
      >
        {{ page }}
      </button>
    </span>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-full border border-[#BA64FE] text-white transition duration-200 ease-in-out hover:bg-[#BA64FE] hover:border-[#BA64FE] disabled:opacity-50"
    >
      &gt;
    </button>

    <button
      @click="changePage(totalPages)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-full border border-[#BA64FE] text-white transition duration-200 ease-in-out hover:bg-[#BA64FE] hover:border-[#BA64FE] disabled:opacity-50"
    >
      &gt;&gt;
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationComp",
  props: {
    currentPage: Number,
    totalPages: Number,
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
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("update:currentPage", page);
      }
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>

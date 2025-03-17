<template>
  <!-- Page Navigation -->
  <div
    class="flex items-center justify-center flex-wrap space-x-2 mt-4 relative w-full"
  >
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
    <div class="ml-4">
      <select
        disabled
        v-model="perPage"
        @change="emitPerPage"
        class="hidden sm:block absolute right-0 bottom-0 cursor-not-allowed opacity-40 bg-[#BA64FE] text-white py-2 px-4 rounded-md border border-[#BA64FE] transition duration-200 ease-in-out hover:bg-[#9d47c0]"
      >
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="30">30</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationComp",
  emits: ["update:modelValue"],
  props: {
    currentPage: Number,
    totalPages: Number,
    modelValue: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      screenWidth: window.innerWidth,
      perPage: this.modelValue, // Bind perPage to the modelValue prop
    };
  },
  computed: {
    visiblePages() {
      const pages = [];

      // Determine page range based on screen width
      const pageRange =
        this.screenWidth <= 640 ? 1 : this.screenWidth <= 768 ? 3 : 5; // 1 page for small, 3 for sm, 5 for md+

      let start = Math.max(1, this.currentPage - Math.floor(pageRange / 2));
      let end = Math.min(
        this.totalPages,
        this.currentPage + Math.floor(pageRange / 2)
      );

      // Adjust for edge cases where pages might be less than the range
      if (end - start < pageRange - 1) {
        if (start === 1) end = Math.min(this.totalPages, start + pageRange - 1);
        if (end === this.totalPages) start = Math.max(1, end - pageRange + 1);
      }

      // Push the pages to the array
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("update:currentPage", page);
      }
    },
    emitPerPage() {
      this.$emit("update:modelValue", this.perPage); // Emit the new value for movies per page
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>

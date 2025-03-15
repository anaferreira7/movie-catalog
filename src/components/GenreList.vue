<template>
  <div class="py-2 relative">
    <!-- Arrow buttons for navigation -->
    <button
      @click="scrollLeftHandler"
      class="absolute left-0 top-2 text-white text-lg p-1 z-[0]"
    >
      <span>&lt;</span>
    </button>

    <!-- Genre list with swipe support -->
    <div
      ref="genreList"
      class="px-4 flex space-x-4 overflow-x-hidden pb-2 relative"
      :class="{ 'scrolling-touch': isMobile }"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <button
        @click="toggleGenreSelection('all')"
        :class="[
          'px-4 py-2 rounded-full text-sm border text-white border-[#BA64FE]',
          selectedGenres.includes('all') ? 'bg-[#BA64FE]' : '',
        ]"
        class="flex-shrink-0 transition duration-200 ease-in-out hover:bg-[#BA64FE] hover:border-[#BA64FE]"
      >
        All
      </button>
      <button
        v-for="genre in genres"
        :key="genre.id"
        @click="toggleGenreSelection(genre)"
        :class="[
          'px-4 py-2 rounded-full text-sm border text-white border-[#BA64FE]',
          selectedGenres.includes(genre) ? 'bg-[#BA64FE]' : '',
        ]"
        class="flex-shrink-0 transition duration-200 ease-in-out hover:bg-[#BA64FE] hover:border-[#BA64FE]"
      >
        {{ genre.name }}
      </button>
    </div>

    <!-- Arrow button for the right side -->
    <button
      @click="scrollRightHandler"
      class="absolute right-0 top-2 text-white text-lg p-1 z-[0]"
    >
      <span>&gt;</span>
    </button>

    <!-- Apply Button -->
    <div
      v-if="selectedGenres.length > 0 && selectedGenres[0] !== 'all'"
      class="mt-4 flex justify-center"
    >
      <button
        @click="applyFilters"
        class="px-6 py-2 bg-[#BA64FE] text-white rounded-full hover:bg-[#9b52d3] transition duration-200"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenreList",
  data() {
    return {
      selectedGenres: ["all"],
      isMouseDown: false,
      startX: 0,
      currentScrollLeft: 0,
    };
  },
  computed: {
    genres() {
      return this.$store.state.movies.genres;
    },
    isMobile() {
      return window.innerWidth <= 768;
    },
  },
  methods: {
    toggleGenreSelection(genre) {
      if (genre === "all") {
        this.selectedGenres = ["all"];
      } else {
        if (this.selectedGenres[0] === "all") {
          this.selectedGenres = [];
        }
        const index = this.selectedGenres.findIndex(
          (selected) => selected.id === genre.id
        );
        if (index === -1) {
          this.selectedGenres.push(genre);
        } else {
          this.selectedGenres.splice(index, 1);
          if (!this.selectedGenres.length) {
            this.selectedGenres = ["all"];
          }
        }
      }
      this.$emit("genresSelected", this.selectedGenres);
    },
    scrollLeftHandler() {
      this.$refs.genreList.scrollLeft -= 150;
    },
    scrollRightHandler() {
      this.$refs.genreList.scrollLeft += 150;
    },
    onMouseDown(e) {
      this.isMouseDown = true;
      this.startX = e.pageX - this.$refs.genreList.offsetLeft;
      this.currentScrollLeft = this.$refs.genreList.scrollLeft;
    },
    onMouseMove(e) {
      if (!this.isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.genreList.offsetLeft;
      const walk = (x - this.startX) * 3;
      this.$refs.genreList.scrollLeft = this.currentScrollLeft - walk;
    },
    onMouseUp() {
      this.isMouseDown = false;
    },
    onMouseLeave() {
      this.isMouseDown = false;
    },
    applyFilters() {
      this.$emit("applyGenres", this.selectedGenres);
    },
  },
};
</script>

<style scoped>
.scrolling-touch {
  -webkit-overflow-scrolling: touch;
}

button {
  cursor: pointer;
}
</style>

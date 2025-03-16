<template>
  <div class="flex justify-between flex-wrap items-center px-6 py-2">
    <button
      @click="goToMovies()"
      class="uppercase font-bold text-white w-full mb-2 sm:w-fit sm:mb-0 mt-4 sm:mt-0"
    >
      <span class="block text-xl leading-3"> Movie </span>
      <span class="text-sm w-full text-center leading-3"> Catalog </span>
    </button>

    <div class="w-full sm:w-fit flex items-center sm:gap-x-8">
      <NavBar />
      <Search />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Search from "@/components/Search.vue";

export default {
  name: "TopBar",
  components: { NavBar, Search },
  methods: {
    goToMovies() {
      this.$router.push({ name: "movies" });
    },
  },
};
</script>

<style lang="postcss" scoped>
a.nav-item {
  @apply text-white hover:text-[#BA64FE];
}
.nav-item.current {
  @apply text-[#BA64FE];
}
</style>

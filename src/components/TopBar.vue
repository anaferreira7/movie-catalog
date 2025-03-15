<template>
  <div class="flex justify-between items-center px-6 py-4">
    <div class="">
      <button
        @click="goToMovies()"
        class="uppercase font-bold text-white w-fit"
      >
        <span class="block text-xl"> Movie </span>
        <span class="text-sm w-full text-center"> Catalog </span>
      </button>
    </div>
    <div class="flex items-center gap-x-8">
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

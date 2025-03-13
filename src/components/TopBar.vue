<template>
  <div class="flex justify-between items-center px-6 py-4">
    <div class="">
      <button class="uppercase font-bold text-white w-fit">
        <span class="block text-4xl leading-8"> Movie </span>
        <span class="text-[1.55rem] w-full text-center leading-5">
          Catalog
        </span>
      </button>
    </div>
    <div class="flex items-center gap-x-8">
      <NavBar />
      <Search @update-search="updateSearchHandler" />
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
    updateSearchHandler(searchText) {
      console.log(searchText);
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

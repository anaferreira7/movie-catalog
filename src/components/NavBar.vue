<template>
  <nav>
    <ul class="flex gap-8">
      <li>
        <span class="nav-item cursor-not-allowed"> Home </span>
      </li>
      <li>
        <router-link :to="{ name: 'movies' }" class="nav-item current">
          Movies
        </router-link>
      </li>
      <li>
        <span class="nav-item cursor-not-allowed"> Tv Shows </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="postcss" scoped>
a.nav-item {
  @apply text-white hover:text-[#BA64FE] tracking-wider font-medium;
}

.nav-item.router-link-exact-active {
  @apply text-[#BA64FE] relative;
}
.nav-item.router-link-exact-active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -0.4rem;
  width: 60%;
  height: 2px;
  background-color: #ba64fe;
  transform: translateX(-50%);
}
</style>

<template>
  <router-view />
</template>

<style lang="postcss">
body {
  @apply bg-[#0b0b0b] text-white;
}

#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply w-full;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

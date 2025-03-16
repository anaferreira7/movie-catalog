<template>
  <TopBar />
  <router-view />
</template>
<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "DashboardView",
  components: {
    TopBar,
  },
  created() {},
};
</script>

<style lang="postcss">
body {
  background: rgb(27, 24, 32);
  background: linear-gradient(
    120deg,
    rgba(27, 24, 32, 1) 0%,
    rgba(37, 29, 50, 1) 80%,
    rgba(66, 38, 113, 1) 100%
  );
  @apply text-white;
}

#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply w-full;
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}
::-webkit-scrollbar-thumb {
  background: theme(colors.gray.700);
  border-radius: 1rem;
}
::-webkit-scrollbar-thumb:hover {
  background: theme(colors.gray.900);
}
::-webkit-scrollbar-track {
  background: theme(colors.gray.800);
  border-radius: 1rem;
}
</style>

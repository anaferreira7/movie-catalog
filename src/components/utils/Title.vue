<template>
  <h1
    class="uppercase font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white"
  >
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: "TitleComp",
  props: {
    text: {
      required: true,
    },
  },
};
</script>

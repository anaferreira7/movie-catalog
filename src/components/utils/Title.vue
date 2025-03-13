<template>
  <h1 class="uppercase font-bold text-5xl text-white">{{ text }}</h1>
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

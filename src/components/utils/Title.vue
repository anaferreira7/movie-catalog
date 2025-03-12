<template>
  <h1 class="uppercase font-bold text-xl text-yellow-400">{{ text }}</h1>
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

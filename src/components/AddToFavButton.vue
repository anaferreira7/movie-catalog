<template>
  <button
    @click.prevent="toggleFavorite"
    class="p-2"
    :title="isFavorite(movie?.id) ? 'Remove from favorite' : 'Add to favorite'"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      class="size-6"
      :class="
        isFavorite(movie?.id)
          ? 'fill-red-500 stroke-red-500'
          : 'fill-transparent stroke-current'
      "
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  </button>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "AddToFav",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("userPreferences", ["isFavorite"]),
  },
  methods: {
    ...mapMutations("userPreferences", [
      "ADD_FAVORITE_MOVIE",
      "REMOVE_FAVORITE_MOVIE",
    ]),
    toggleFavorite() {
      if (this.isFavorite(this.movie.id)) {
        this.REMOVE_FAVORITE_MOVIE(this.movie.id);
      } else {
        this.ADD_FAVORITE_MOVIE(this.movie);
      }
    },
  },
};
</script>

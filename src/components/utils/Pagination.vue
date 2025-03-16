<template>
  <ul class="admin-pagination" style="flex: 0">
    <li
      class="admin-pagination__page-number-container"
      :class="{ disabled: currentPage === 1 }"
    >
      <router-link
        :to="{
          query: searchText ? { page: 1, search: searchText } : { page: 1 },
        }"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </router-link>
    </li>
    <li
      class="admin-pagination__page-number-container"
      :class="{ disabled: currentPage === 1 }"
    >
      <router-link
        :to="{
          query: searchText
            ? { page: currentPage - 1, search: searchText }
            : { page: currentPage - 1 },
        }"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </router-link>
    </li>
    <li v-if="collapseLeft">...</li>
    <li
      v-for="pageNumber in totalPages"
      :key="'page_' + pageNumber + '_in_' + totalPages"
      class="admin-pagination__page-number-container"
      :class="{
        active: currentPage === pageNumber,
        hidden: checkCurrentPagePlaceToHideBullets(pageNumber),
      }"
    >
      <!-- <div
              
              v-if="
                 (currentPage === 1 && pageNumber <= maxBullets) ||
                 (currentPage === totalPages &&
                    pageNumber >= totalPages - maxBullets) ||
                 (pageNumber <= currentPage + 2 && pageNumber >= currentPage - 2)
              "
              :class="{ }"
           > -->
      <router-link
        :to="{
          query: searchText
            ? { page: pageNumber, search: searchText }
            : { page: pageNumber },
        }"
      >
        {{ pageNumber }}
      </router-link>
      <!-- </div> -->
    </li>
    <li v-if="collapseRight">...</li>
    <li
      class="admin-pagination__page-number-container"
      :class="{ disabled: currentPage === totalPages }"
    >
      <router-link
        :to="{
          query: searchText
            ? { page: currentPage + 1, search: searchText }
            : { page: currentPage + 1 },
        }"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </router-link>
    </li>
    <li
      class="admin-pagination__page-number-container"
      :class="{ disabled: currentPage === totalPages }"
    >
      <router-link
        :to="{
          query: searchText
            ? { page: totalPages, search: searchText }
            : { page: totalPages },
        }"
      >
        <svg
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </router-link>
    </li>
  </ul>
</template>

<script>
import eventBus from "@/eventBus";

export default {
  name: "AdminPagination",

  props: {
    itemsPerPage: {
      type: Number,
      default: 50,
    },
  },

  data() {
    return {
      currentPage: 1,
      // pageNumber: 1, // ?? this param is missing and causing havoc; temptative init to pageNumber 1 | this did NOT worked
      totalPages: 1,
      maxBullets: 5,
      searchText: null,
      collapseLeft: false,
      collapseRight: false,
    };
  },

  watch: {
    "$route.query.page": {
      immediate: true,
      handler(page) {
        page = parseInt(page) || 1;
        if (page !== this.currentPage) {
          this.currentPage = page;
        }

        if (this.$route.query.search) {
          this.searchText = this.$route.query.search;
        }

        eventBus.$emit(
          "updatePage",
          this.currentPage,
          this.itemsPerPage,
          this.searchText
        );

        // TODO - DO REQUEST HERE
        //  fetch(`/api/items?page=${page}`, { method: "GET" })
        //     .then((response) => response.json())
        //     .then(({ pager, pageOfItems }) => {
        //        this.pager = pager;
        //        this.pageOfItems = pageOfItems;
        //     });
      },
    },
  },

  created() {
    if (this.$route.query.search) {
      this.searchText = this.$route.query.search;
    }
    eventBus.$on("updatePaginationPages", this.setPages);
    eventBus.$on("updatePageSync", this.updatePageSync);
  },

  beforeDestroy() {
    eventBus.$off("updatePaginationPages", this.setPages);
    eventBus.$off("updatePageSync", this.updatePageSync);
  },

  methods: {
    updatePageSync() {
      eventBus.$emit("updatePage", 1, this.itemsPerPage, this.searchText);
    },
    checkCurrentPagePlaceToHideBullets(pageNumber) {
      if (this.currentPage <= Math.floor(this.maxBullets / 2)) {
        //inicio da paginaçao
        if (pageNumber > this.maxBullets) {
          return true;
        }
      } else if (
        //fim da paginação
        this.currentPage >
        this.totalPages - Math.floor(this.maxBullets / 2)
      ) {
        if (pageNumber <= this.totalPages - this.maxBullets) {
          return true;
        }
      } else {
        //meio
        if (
          pageNumber > this.currentPage + Math.floor(this.maxBullets / 2) ||
          pageNumber < this.currentPage - Math.floor(this.maxBullets / 2)
        ) {
          return true;
        }
      }
    },

    setPages(numberOfItems, searchText = null) {
      this.$nextTick(() => {
        this.searchText = searchText ? searchText : null;
        this.totalPages = Math.ceil(numberOfItems / this.itemsPerPage);

        this.updateRender();
      });
    },

    updateRender() {
      if (this.currentPage > 3 && this.totalPages > this.maxBullets) {
        this.collapseLeft = true;
      } else {
        this.collapseLeft = false;
      }

      if (
        this.totalPages > this.maxBullets &&
        this.currentPage <= this.totalPages - 3
      ) {
        this.collapseRight = true;
      } else {
        this.collapseRight = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.admin-pagination {
  height: $pagination--height;
  @apply flex gap-x-1.5 items-center justify-center py-2;

  .admin-pagination__page-number-container {
    width: 1.25rem;
    height: 1.25rem;
    @apply border rounded-full text-xs;

    &.active {
      @apply bg-primary text-gray-900 border-primary font-semibold text-sm;
    }

    a {
      @apply h-full w-full flex items-center justify-center;
    }
  }
}

/* .admin-pagination__page-number-container.active {
     @apply bg-primary text-gray-900 border-primary font-semibold text-sm;
  } */
</style>

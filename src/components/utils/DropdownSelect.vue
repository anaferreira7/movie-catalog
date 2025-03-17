<template>
  <div ref="dropdown" class="relative inline-block w-full max-w-xs">
    <!-- Selected Items as Pills -->
    <div
      v-if="selectedItems.length && multiple"
      class="flex flex-wrap gap-2 mb-2"
    >
      <div
        v-for="item in selectedItems"
        :key="valueKey ? item[valueKey] : item"
        class="flex items-center bg-[#BA64FE] text-white px-3 py-1 rounded-full text-sm"
      >
        {{ labelKey ? item[labelKey] : item }}
        <button
          @click.stop="removeSelection(item)"
          class="ml-2 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="w-full flex justify-between items-center px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none"
    >
      <span v-if="!selectedItems.length"> {{ placeholder }} </span>
      <span v-else> {{ displayText }} </span>
      <svg
        class="w-4 h-4 ml-2 transition-transform transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <!-- Dropdown List -->
    <div
      v-if="isOpen"
      class="absolute mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-md z-10 max-h-60 overflow-y-auto"
    >
      <div class="p-2">
        <button
          v-for="item in items"
          :key="valueKey ? item[valueKey] : item"
          @click="toggleSelection(item)"
          class="w-full text-left px-4 py-2 rounded-md text-white hover:bg-[#BA64FE] transition"
          :class="{ 'bg-[#BA64FE]': isSelected(item) }"
        >
          {{ labelKey ? item[labelKey] : item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownSelect",
  props: {
    modelValue: { required: true },
    items: { type: Array, required: true },
    multiple: { type: Boolean, default: true },
    labelKey: { type: String, required: false },
    valueKey: { type: String, required: false },
    placeholder: { type: String, default: "Select an option" },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    selectedItems() {
      return this.modelValue || [];
    },
    displayText() {
      return this.multiple
        ? `${this.selectedItems.length} selected`
        : this.selectedItems[0]?.[this.labelKey] || this.placeholder;
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleSelection(item) {
      if (this.multiple) {
        let updatedSelection = [...this.selectedItems];
        const index = updatedSelection.findIndex(
          (i) => i[this.valueKey] === item[this.valueKey]
        );

        if (index === -1) {
          updatedSelection.push(item);
        } else {
          updatedSelection.splice(index, 1);
        }

        this.$emit("update:modelValue", updatedSelection);
      } else {
        this.$emit("update:modelValue", [item]);
        this.isOpen = false;
      }
    },
    removeSelection(item) {
      const updatedSelection = this.selectedItems.filter(
        (i) => i[this.valueKey] !== item[this.valueKey]
      );
      this.$emit("update:modelValue", updatedSelection);
    },
    isSelected(item) {
      return this.selectedItems.some(
        (i) => i[this.valueKey] === item[this.valueKey]
      );
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
};
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s ease-in-out;
}
</style>

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import { getYearFromStringDate } from "./helpers/getYearFromStringDate";

const app = createApp(App);

// Global helper
app.config.globalProperties.$getYearFromStringDate = getYearFromStringDate;

app.use(store).use(router).mount("#app");

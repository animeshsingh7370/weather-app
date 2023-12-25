import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import WeatherReport from "./components/WeatherReport.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/weatherdetails", name: "WeatherReport", component: WeatherReport },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

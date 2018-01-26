import VueRouter from "vue-router"
import Search from "./components/Search.vue";
import Weather from "./components/Weather.vue";
import Tides from "./components/Tides.vue";
import SunMoon from "./components/SunMoon.vue";
import NotFound from "./components/NotFound.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Search },
    { path: "/tides", component: Tides },
    { path: "/weather", component: Weather },
    { path: "/sunmoon", component: SunMoon },
    { path: "*", component: NotFound }
  ]
});

export default router;

<template>
<div>
  <ul class="menu-bar">
    <li class="menu-bar__item">
      <router-link to="/" class="menu-bar__item--link">
          MyWeather
      </router-link>
    </li>
    <li>
      <button @click="getWeather" class="btn-transparent menu-bar__item--link btn-1 btn-medium">Weather</button>
    </li>
    <li>
      <button @click="getSunmoon" class="menu-bar__item--link btn-2 btn-medium">Sun and Moon</button>
    </li>
  </ul>

  <div class='tides-container'>
    <h2 class="secondary-header">
      Tides in {{city}}
    </h2>

    <div class="horizontal-slide">
      <ul class="horizontal-slide__wrapper">
        <li v-for="tide in tides">
          <tide-card :tide="tide" />
        </li>
      </ul>
    </div>
  
  </div>
</div>
</template>

<script>
</script>

<style lang="scss">
@import "../sass/main.scss";

.tides-container {
  margin-top: 5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

</style>

<script>
import {mapGetters} from "vuex";
import TideCard from "./TideCard";

export default {
  methods: {
    getWeather() {
      this.$store.dispatch("getWeather");
      this.$router.push("/weather");
    },

    getSunmoon() {
      this.$router.push("/sunmoon");
    }
  },

  components: {
    "tide-card": TideCard
  },
  
  computed: {
    ...mapGetters(["tides", "city"])
  },
}
</script>
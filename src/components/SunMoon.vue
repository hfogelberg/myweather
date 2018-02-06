<template>
  <div>
    <ul class="menu-bar">
      <li class="menu-bar__item">
        <router-link to="/" class="menu-bar__item--link">
          <h3 class="tertiary-header gradient-text">My Weather</h3>
        </router-link>
      </li>
      <li>
        <button @click="getWeather" class="btn menu-bar__item--link btn-2 btn-medium">
          Weather
        </button>
      </li>
      <li>
        <button @click="getTides" class="btn menu-bar__item--link btn-1 btn-medium">
        Tides
        </button>
      </li>
    </ul>

    <div class='sunmmon-container'>
      <h2 class="secondary-header">
        Sun & Moon <br>
        in {{city}}
      </h2>

    <div class="horizontal-slide">
      <ul class="horizontal-slide__wrapper">
        <li v-for="astro in astroTimes">
          <sun-card :astro="astro" />
        </li>
      </ul>
    </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import SunCard from "./SunCard";

export default {
  components: {
    'sun-card': SunCard
  },

  computed: {
    ...mapGetters(["astroTimes", "city"])
  },

  methods: {
    getWeather() {
      this.$store.dispatch("getForecast");
      this.$router.push("/weather");
    },

    getTides() {
      this.$store.dispatch("getTides");
      this.$router.push("/tides");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.sunmmon-container {
  margin-top: 5rem;

  @media only screen and (max-width: 599px) {
    margin-top: 2rem;
  }
}

.sun-row {
  color: black;
}

</style>
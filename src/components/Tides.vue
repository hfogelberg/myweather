<template>
<div class="tides">
  <ul class="menu-bar">
    <li class="menu-bar__item">
      <router-link to="/" class="menu-bar__item--link menu-title">
        <h3 class="tertiary-header gradient-text">My Weather</h3>
      </router-link>
    </li>
    <li>
      <button @click="getWeather" class="btn menu-bar__item--link btn-1 btn-medium">Weather</button>
    </li>
    <li>
      <button @click="getSunmoon" class="btn menu-bar__item--link btn-2 btn-medium">Astronomy</button>
    </li>
  </ul>

  <div class='tides-container'>
    <h2 class="secondary-header">
      Tides in <br>
      {{city}}
    </h2>

    <div class="horizontal-slide">
      <ul class="horizontal-slide__wrapper">
        <li v-for="tide in tides">
          <tide-card :tide="tide" class="card" />
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

.tides {
  max-height: 100vh;
}

.tides-container {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    @media only screen and (min-width: 600px){
      padding: 2rem;
    }
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
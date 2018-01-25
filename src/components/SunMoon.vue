<template>
  <div>
    <ul class="menu-bar">
      <li class="menu-bar__item">
        <router-link to="/" class="menu-bar__item--link">
          <h3 class="tertiary-header">MyWeather</h3>
        </router-link>
      </li>
      <li>
        <button @click="getWeather" class="menu-bar__item--link btn-2 btn-medium">
          Weather
        </button>
      </li>
      <li>
        <button @click="getTides"   class="btn-transparent menu-bar__item--link btn-1 btn-medium">
        Tides
        </button>
      </li>
    </ul>

    <div class='sunmmon-container'>
      <h2 class="secondary-header">Sun and Moon</h2>
      <div class="sunmoon-card">     
          <div class="row">
            <div class="col-4-12">
              <img class="image" src="../../public/icons/sunrise.svg">
            </div>
            <div class="col-8-12">
              <h3 class="tertiary-header">{{sun.sunrise}}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-4-12">
              <img class="image" src="../../public/icons/sunset.svg">
            </div>
            <div class="col-8-12">
              <h3 class="tertiary-header">{{sun.sunset}}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-4-12">
              <img class="image" src="../../public/icons/clear-night.svg">
            </div>
            <div class="col-8-12">
              <h3 class="tertiary-header">{{moon.phase}} %</h3>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["sun", "moon"])
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
}

.sun-row {
  color: black;
  background-color: orange;
}

.sunmoon-card {
  min-height: 40vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  overflow-x: auto;
  border: 1px solid black;
  border-radius: 5px;
  background-color: $accent-color;
  box-shadow: 0 10px 20px rgba($color-black, 0.2);
  margin-right: 1rem;
  width: 70vw;
  margin-left: 10vw;
  margin-right: 10vw;
}

.row {
  @media only screen and (max-width: 599px){
    width: 100%;
    line-height: 1.5rem;
  }
  @media only screen and (min-width: 600px){
    line-height: 8rem;
  }
}

.tertiary-header {
  text-align: left;
}

.image {
  @media only screen and (max-width: 599px){
    max-height: 2rem;
  }
  @media only screen and (min-width: 600px){
    max-height: 8rem;
  }
}

ul {
    list-style: none
}
</style>
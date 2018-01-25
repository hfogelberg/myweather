<template>
  <div>
    <ul class="menu-bar">
      <li class="menu-bar__item">
        <router-link to="/" class="menu-bar__item--link">
          <h3 class="tertiary-header gradient-text">MyWeather</h3>
        </router-link>
      </li>
      <li>
        <button @click="getWeather" class="menu-bar__item--link btn-2 btn-medium">
          Weather
        </button>
      </li>
      <li>
        <button @click="getTides" class="btn-transparent menu-bar__item--link btn-1 btn-medium">
        Tides
        </button>
      </li>
    </ul>

    <div class='sunmmon-container'>
      <h2 class="secondary-header">
        Sun and Moon in <br>
        {{city}}
      </h2>
      <div class="sunmoon-card"> 
        <table class="forecast">
          <tr>
            <td>
              <img class="image" src="../../public/icons/sunrise.svg" >
            </td>
            <td>
              <div class="sun-label">
                {{sun.sunrise}}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img class="image" src="../../public/icons/sunset.svg">
            </td>
            <td>
              <div class="sun-label">
                {{sun.sunset}}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img class="image" src="../../public/icons/clear-night.svg">
            </td>
            <td>
              <div class="sun-label">
                {{moon.phase}} %
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["sun", "moon", "city"])
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
  width: 70vw;

  @media only screen and (max-width: 320px){
      margin-left: 8vw;
      margin-top: 5rem;
  }

  @media only screen and (min-width: 321px) and (max-width: 600px){
    width: 70vw;
    margin-left: 8vw;
    margin-top: 6rem;
  }

  @media only screen and (min-width: 601px){
    width: 40vw;
    margin-left: 30vw;
    margin-top: 8rem;
  }
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

.sun-label {
  text-align: left;

  @media only screen and (max-width: 320px) {
    font-size: 2.5rem;
    font-weight: 400;
  }

  @media only screen and (min-width: 321px) and (max-width: 599px) {
    font-size: 3.2rem;
    font-weight: 300;
  }

  @media only screen and (min-width: 600px){
    font-size: 3.5rem;
    font-weight: 700;
  }
}

td > .image {
  @media only screen and (max-width: 320px) and (max-width: 599px) {
    height: 4rem;
    padding: .5rem 2rem .5rem 1rem;
  }

  @media only screen and (min-width: 321px) and (max-width: 599px) {
    height: 5rem;
    padding: .5rem 2rem 1rem 2rem;
  }
  @media only screen and (min-width: 600px){
    height: 8rem;
    padding: .5rem 2rem .5rem 1rem;
  }
}

ul {
  list-style: none
}
</style>
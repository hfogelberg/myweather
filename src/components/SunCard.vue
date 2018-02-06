<template>
  <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>
        <td>
          <img class="card-image" v-bind:src="imageRootUrl + 'clear-day.svg'">
        </td>
        <td>
          <h3 class="weather-date">{{astro.date}}</h3>
        </td>
      </tr>
      <tr>        
        <td>Sunrise</td>
        <td>{{astro.sunrise}}</td>
      </tr>
      <tr>
        <td>Sunset</td> 
        <td>{{astro.sunset}}</td>
      </tr>
      <tr>
        <td>
          <img v-bind:src="astro.moonImage" class="card-image">
        </td>
        <td>{{astro.fraction}} %</td>
      </tr>
      <tr>
        <td>Moonrise</td>
        <td>{{astro.moonrise}}</td>
      </tr>
      <tr>
        <td>Moonset</td>
        <td>{{astro.moonset}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
import {mapGetters} from "vuex"
export default {
  props: ["astro"],
  computed: {
    ...mapGetters(["imageRootUrl"])
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.forecast {
  height: 100%;
  width: 100%;
  font-size: 1.8rem;

  @media only screen and (min-width: 600px) {
    height: 30vh;
    font-size: 2rem;
    font-weight: 400;
  }
}

.card-image {
    @media only screen and (max-width: 320px) {
        height: 4rem;
        padding: 1rem;
    }
    @media only screen and (min-width: 321px) and (max-width: 350px) {
        height: 5rem;
    }
    @media only screen and (min-width: 351px) and (max-width: 599px) {
        height: 4rem;
    }
    @media only screen and (min-width: 600px) {
        height: 7rem;
    }
}
</style>
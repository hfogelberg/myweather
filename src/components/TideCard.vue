<template>
  <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>        
      <tr>
        <td>
          <img v-bind:src = "imageRootUrl + tide.type" class="card-image">
        </td>
        <td>
          <h3 class="weather-date">{{tide.date}}</h3>
        </td>
      </tr>
      <tr>
        <td>Height:</td> 
        <td>{{tide.height}} m</td>
      </tr>
      <tr>
        <td>Type: </td>
        <td>{{tide.type}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
export default {
  props: ["tide"],
  computed: {
    ...mapGetters(["imageRootUrl"])
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.card-image {
  height: 10rem;
}

.weather-date {
  font-size: 3.5rem;
  font-weight: 700;
}

td { 
  line-height: 5rem;
  font-size: 2.5rem;
}

td:nth-child(2) {
    padding-left: 1rem;
}
</style>
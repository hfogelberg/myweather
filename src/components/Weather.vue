<template>
  <div class='weather-container'>
    <h1 class="primary-header">
      Weather in {{city}}
    </h1>
    
    <weather-card v-if="showNow" :forecast="currently" class='card'/>

    <div class="horizontal-slide" v-if="showDay">
      <ul class="horizontal-slide__wrapper">
        <li v-for="forecast in daily">
          <weather-card :forecast="forecast" class='card'/>
        </li>
      </ul>
    </div>

    <div class="horizontal-slide" v-if="showHour">
      <ul class="horizontal-slide__wrapper">
        <li v-for="forecast in hourly">
          <weather-card :forecast="forecast" class='card'/>
        </li>
      </ul>
    </div>
    
    <ul class="button-row">
      <li><button @click="now" class="btn-large btn-1">Now</button></li>
      <li><button @click="hours" class="btn-large btn-2">Hours</button></li>
      <li><button @click="days" class="btn-large btn-3">Days</button></li>
    </ul>
  </div>
</template>
      
      
      
<script>
import {mapGetters} from "vuex";
import WeatherCard from './Weathercard.vue';

export default {
  data() {
      return {
          showNow: true, 
          showDay: false, 
          showHour: false
      }
  },
  methods: {
      now() {
          this.showNow=true;
          this.showDay=false;
          this.showHour=false;
      },
      
      hours() {
          this.showNow=false;
          this.showDay=false;
          this.showHour=true;
      },
      
      days() {
          this.showNow=false;
          this.showDay=true;
          this.showHour=false;
      }
  },

  components: {
      'weather-card': WeatherCard
  },
  
  computed: {
      ...mapGetters(["city", "currently", "daily", "hourly"])
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.weather-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.weather-heading-main {
    text-align: center;
    color: $primary-color-text;
    font-size: 4rem;
    text-transform: uppercase;
    animation: moveInLeft 1s ease-out;
    letter-spacing: 0.29rem;
}

.weather-heading-sub {
    color: $primary-color-text;
    font-size: 2rem;
    letter-spacing: 0.085rem;
    display: block;
    animation-delay: 1s;
    animation: moveInRight 1s ease-out;
    margin-bottom: 1.5em;
}

ul {
    list-style: none
}

.weather-image {
    max-height: 8rem;
}
</style>
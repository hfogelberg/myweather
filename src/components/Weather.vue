<template>
<div class="weather">
  <ul class="menu-bar">
    <li class="menu-bar__item">
      <router-link to="/" class="menu-bar__item--link">
        <h3 class="tertiary-header gradient-text">MyWeather</h3>
      </router-link>
    </li>
    <li>
      <button @click="getTides" class="btn-transparent menu-bar__item--link btn-1 btn-medium">Tides</button>
    </li>
    <li>
      <button @click="getSunmoon" class="menu-bar__item--link btn-2 btn-medium">Sun/Moon</button>
    </li>
  </ul>

  <div class='weather-container'>
    <h2 class="secondary-header">
      Weather in {{city}}
    </h2>
    
    <weather-card v-if="showNow" :forecast="currently" class='card'/>

    <div class="horizontal-slide" v-if="showDay">
      <ul class="horizontal-slide__wrapper" ref="days">
        <li v-for="forecast in daily">
          <weather-card :forecast="forecast" class='card'/>
        </li>
      </ul>
    </div>

    <div class="horizontal-slide" v-if="showHour">
      <ul class="horizontal-slide__wrapper" ref="hours">
        <li v-for="forecast in hourly">
          <weather-card :forecast="forecast" class='card'/>
        </li>
      </ul>
    </div>
  </div>

    <ul class="footer-button-row">
      <li>
        <button @click="now" class="btn-medium btn-1">
          Now
          </button>
        </li>
      <li>
        <button @click="hours" class="btn-medium btn-2">
          Hours
        </button>
      </li>
      <li>
        <button @click="days" class="btn-medium btn-3">
          Days
        </button>
      </li>
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
          this.$refs.hours.scrollLeft = 0;
      },
      
      days() {
          this.showNow=false;
          this.showDay=true;
          this.showHour=false;
          this.$refs.days.scrollLeft = 0;
      },

      getTides() {
        this.$store.dispatch("getTides");
        this.$router.push("/tides");
      },

      getSunmoon() {
        this.$router.push("/sunmoon");
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
.weather {
  max-height: 100vh;
}

.weather-container {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    @media only screen and (min-width: 600px){
      padding: 2rem;
    }
}

.horizontal-slide {
  @media only screen and (min-width: 600px){
    margin-top: 6rem;
  }
}

.weather-image {
  @media only screen and (max-width: 599px){
    max-height: 2rem;
  }
  @media only screen and (min-width: 600px){
    max-height: 8rem;
  }
}
</style>
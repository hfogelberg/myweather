<template>    
  <div class="search-container">
    <h1 class="primary-header">My Weather</h1>
    <input type="text" class="search-location" v-model="city">

    <div class="button-row" v-if="hasCity">
      <button @click="getWeather" class="btn-large btn-1">
        Weather
      </button>
      <button @click="getTides" class="btn-large btn-2">
        Tides
      </button>
      <button @click="getSun" class="btn-large btn-3">
        Sun and Moon Times
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  data() {
    return {
      hasLocation: false
    }
  },
  mounted() {
    this.getLocation()
  },
  computed: {
  ...mapGetters(["city", "hasCity"])
  },
  methods: {
    getSun() {
      this.$router.push("/sunmoon");
    },

    getWeather() {
      this.$store.dispatch('getForecast');
      this.$router.push('/weather');
    },

    getTides() {
      this.$store.dispatch("getTides");
      this.$router.push("/tides");
    },

    getLocation() {
      console.log("Get location")
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          console.log('Position', position);
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          
          this.$store.dispatch('location', location);
        });
      } else {
        console.log("Can't handle geolocation");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
  .search-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
  }

  .search-location {
    margin-top: 5rem;
    width: 70vw;
    line-height: 3rem;
    font-size: 2rem;
    font-weight: 400;
    padding: .5rem;
    text-align: center;
  }
</style>
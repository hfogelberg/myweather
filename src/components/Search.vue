<template>    
  <div class="search-container">
    <h1 class="primary-header">My Weather</h1>
    <ul class="search-row">
      <li><input type="text" class="search-location" v-model="city"></li>
      <li>
        <button @click="getLocation" class="btn-transparent btn-gps"> 
          <img src="/public/icons/gps.svg" class="img-gps"/>
        </button>
      </li>
    </ul>

    <div v-if="isSearching">
      <h2 class="heading-secondary">Checking where you are ...</h2>
      <div class="spinner"></div>
    </div>

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

  computed: {
  ...mapGetters(["city", "hasCity", "isSearching"])
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
      this.$store.dispatch("setIsSearching");
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
    width: 70vw;
    line-height: 5rem;
    font-size: 2.5rem;
    font-weight: 500;
    padding: .5rem;
    text-align: center;
    border-radius: 10px;
  }

  .search-row {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &li {
      margin-right: $gutter-xsmall;
    }
  }

  .btn-gps {
    height: 5rem;
    padding: .5rem;
  }

  .img-gps {
    height: 5rem;
  }

</style>
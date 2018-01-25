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

    <div class="searching" v-show="isSearching">
      <div class="searching__text">Checking where you are ...</div>
      <div class="spinner"></div>
    </div>

    <div class="row button-row" v-show="hasCity">
        <div class="col-4-12 color-red">
          <button @click="getWeather" class="btn-large btn-1">
            Weather
          </button>
        </div>
        <div class="col-4-12 color-blue">
          <button @click="getTides" class="btn-large btn-2">
            Tides
          </button>
        </div>
        <div class="col-4-12 color-green">
          <button @click="getSun" class="btn-large btn-3">
            Sun and Moon Times
          </button>
        </div>
      </div>
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
      this.$store.dispatch("getSunMoon")
      this.$router.push("/sunmoon");
    },

    getWeather() {
      this.$store.dispatch("getForecast");
      this.$router.push("/weather");
    },

    getTides() {
      this.$store.dispatch("getTides");
      this.$router.push("/tides");
    },

    getLocation() {
      this.$store.dispatch("reset");
      this.$store.dispatch("setIsSearching", true);
      this.$store.dispatch("setHasCity", false);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          
          this.$store.dispatch("location", location);
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

  .search-row {
    @media only screen and (min-width: 321px) and (max-width: 400px) {
      margin-top: 1rem;
    }
    @media only screen and (min-width: 401px) and (max-width: 600px) {
      margin-bottom: 2rem;
    }
    @media only screen and (min-width: 601px) {
      margin-top: 6rem;
      margin-bottom: 6rem;
    }
  }

  .searching {
    margin-top: 3rem;

    &__text {
      @media only screen and (max-width: 320px) {
        font-size: 1.5rem;
      }
       @media only screen and (min-width: 330px) and (max-width: 375px) {
        font-size: 2rem;
      }
    }
  }

  .search-location {
    width: 70vw;
    padding: .5rem;
    text-align: center;
    border-radius: 10px;
    @media only screen and (max-width: 599px) {
      line-height: 4rem;
      font-size: 2rem;
      font-weight: 400;
    }

    @media only screen and (min-width: 600px) {
      line-height: 5rem;
      font-size: 2.5rem;
      font-weight: 500;
    }
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

  .primary-header {
    @media only screen and (max-width: 599px) {
      margin-top: 5rem;
      margin-bottom: 5rem;
    }
  }

  .btn-gps {
    height: 5rem;
    padding: .5rem;
  }

  .img-gps {
    height: 5rem;
  }

  .button-row {
    margin-top: 5rem;
    backgroun-color: red;
  }
</style>
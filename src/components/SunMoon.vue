<template>
  <div>
    <ul class="menu-bar">
      <li class="menu-bar__item">
        <router-link to="/"           class="menu-bar__item--link">
            MyWeather
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
    </div>
  </div>
</template>

<script>
export default {
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

<style lang="scss">
@import "../sass/main.scss";

ul {
    list-style: none
}
</style>
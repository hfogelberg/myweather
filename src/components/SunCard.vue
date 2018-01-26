<template>
  <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>
        <td>
          <img class="card-image" src="../../public/icons/clear-day.svg">
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
          <img :src="astro.moonImage" class="card-image">
        </td>
        <td>{{astro.fraction}}</td>
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
export default {
  props: ["astro"]
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.horizontal-slide__wrapper--card {
  margin-top: 6rem;
}

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
</style>
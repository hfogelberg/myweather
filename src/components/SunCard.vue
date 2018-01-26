<template>
  <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>
        <td colspan="2">{{astro.date}}</td>
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
        <td>Moon fraction</td>
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
  @media only screen and (min-width: 600px) {
    height: 30vh;
  }
}

.forecast {
  height: 100%;
  width: 100%;
  padding: 2rem;
  font-size: 1.8rem;
  tr:first-child {
    line-height: 8rem;
    font-size: 2.2rem;
    font-weight: 400;
  }
  @media only screen and (min-width: 600px) {
    height: 30vh;
    font-size: 2.2rem;
    padding: 1rem;
  }
}

.image {
  display: block;
  margin: 0 auto;
  padding: 1rem;
  @media only screen and (max-width: 320px) {
    height: 5rem;
  }
  @media only screen and (min-width: 320px) and (max-width: 350px) {
    height: 8rem;
  }
  @media only screen and (min-width: 351px) and (max-width: 599px) {
    height: 7rem;
  }
  @media only screen and (min-width: 600px) {
    height: 3rem;
  }
}
</style>
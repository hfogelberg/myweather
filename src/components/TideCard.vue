<template>
  <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>        
      <tr>
        <td>
          <img :src = "'../public/icons/' + tide.type + '.svg'" class="card-image">
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
export default {
  props: ["tide"]
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

</style>
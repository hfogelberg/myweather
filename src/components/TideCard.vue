<template>
  <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>        
        <td colspan="2">
          <h3>
            {{tide.date}}
          </h3>
        </td>
      <tr>
        <td colspan="2">
            <img :src = "'../public/icons/' + tide.type + '.png'" />
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

.horizontal-slide__wrapper--card {
  margin-top: 6rem;
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
}

img {
  display: block;
  margin: 0 auto;
  padding: 1rem;
}
</style>
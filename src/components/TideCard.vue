<template>
    <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
      <tr>
        <td>
            Image
        </td>
        <td>
          <h3>
          {{tide.date}}
          </h3>
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
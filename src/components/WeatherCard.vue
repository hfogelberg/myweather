<template>
    <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
        <tr>
            <td>
                <img class="card-image" v-bind:src="imageRootUrl + forecast.icon">
            </td>
            <td>
                <h3 class="weather-date">
                    {{forecast.date}}<br>
                </h3>
            </td>
        </tr>
        <tr>
            <td></td>
            <td class="summary">
                {{forecast.summary}}
            </td>
        </tr>
        <tr>
            <td>Temp:</td> 
            <td>{{forecast.temp}}°C</td>
        </tr>
        <tr>
            <td>Pressure: </td>
            <td>{{forecast.pressure}} hPa</td>
        </tr>
        <tr>
            <td>Wind: </td>
            <td>{{forecast.windBearing}} {{forecast.windSpeed}} m/s</td>
        </tr>
        <tr>
            <td>Humidity: </td>
            <td>{{forecast.humidity}}% </td>
        </tr>
        <tr>
            <td>Cloud: </td>
            <td>{{forecast.cloudCover}}%</td>
        </tr>
    </table>
</div>

</template>

<script>
import {mapGetters} from "vuex";
export default {
  props: ["forecast"],
  computed: {
    ...mapGetters(["imageRootUrl"])
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

td {
    padding-top: 0;
    padding-bottom: 0;
}

.summary {
    font-size: 1.7rem;
    font-weight: 700;
}

td:nth-child(2) {
    padding-left: 1rem;
}

</style>
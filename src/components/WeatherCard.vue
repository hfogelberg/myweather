<template>
    <div class="horizontal-slide__wrapper--card">          
    <table class="forecast">
        <tr>
            <td>
                <img class="weather-image"v-bind:src="'../../public/icons/' + forecast.icon + '.svg'">
            </td>
            <td>
                <h3>
                {{forecast.date}}<br>
                </h3>
            </td>
        </tr>
        <tr>
            <td colspan="2">
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
            <td>Cloud cover: </td>
            <td>{{forecast.cloudCover}}%</td>
        </tr>
        <tr>
            <td>Precipitation: </td>
            <td>{{forecast.precipIntensity}} mm ({{forecast.precipProb}}%)</td>
        </tr>
    </table>
</div>

</template>

<script>
export default {
    props: ["forecast"]
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

table {
    border-collapse: collapse;
    height: 100%;
    width: 100%;
}

tr, td {
    position: relative;
    @media only screen and (max-width: 320px) {
        height: 1.5rem;
    }
}

.weather-image {
    @media only screen and (max-width: 320px) {
        height: 5rem;
    }
}
</style>
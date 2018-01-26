const suncalc = require("suncalc"),
      moment = require("moment");

const formatCurrently = (currentlyRaw) => {
  return {
    date: currentlyRaw.time,
    summary: currentlyRaw.summary,
    icon: currentlyRaw.icon,
    precipIntensity: Math.round(currentlyRaw.precipIntensity),
    precipProb: Math.round(currentlyRaw.precipProbability * 100),
    temp: Math.round(currentlyRaw.temperature),
    humidity: Math.round(currentlyRaw.humidity * 100),
    pressure: currentlyRaw.pressure,
    windSpeed: Math.round(currentlyRaw.windSpeed),
    maxWind: Math.round(currentlyRaw.windGust),
    windBearing: currentlyRaw.windBearing,
    cloudCover: Math.round(currentlyRaw.cloudCover * 100),
    uvIndex: currentlyRaw.uvIndex,
    type: "CURRENTLY"
  };
};

const formatHourly = (hourlyRaw) => {
  let hourly = [];
  for (let j = 0; j < hourlyRaw.length; j += 3) {
    let weather = hourlyRaw[j]
    hourly.push(
      {
        date: weather.time,
        summary: weather.summary,
        icon: weather.icon,
        precipIntensity: Math.round(weather.precipIntensity),
        precipProb: Math.round(weather.precipProbability * 100),
        temp: Math.round(weather.temperature),
        humidity: Math.round(weather.humidity * 100),
        pressure: weather.pressure,
        windSpeed: Math.round(weather.windSpeed),
        maxWind: Math.round(weather.windGust),
        windBearing: weather.windBearing,
        cloudCover: Math.round(weather.cloudCover * 100),
        uvIndex: weather.uvIndex,
        type: "HOURLY"
      }
    );
  }

  return hourly;
};

const formatDaily = (dailyRaw) => {
  let daily = dailyRaw.map((weather) => {
    return {
      date: weather.time,
      summary: weather.summary,
      icon: weather.icon,
      precipIntensity: Math.round(weather.precipIntensity),
      precipProb: Math.round(weather.precipProbability * 100),
      temp: Math.round(weather.temperatureMax),
      humidity: Math.round(weather.humidity * 100),
      pressure: Math.round(weather.pressure),
      windSpeed: Math.round(weather.windSpeed),
      maxWind: Math.round(weather.windGust),
      windBearing: weather.windBearing,
      cloudCover: Math.round(weather.cloudCover * 100),
      uvIndex: weather.uvIndex,
      type: "DAILY"
    };
  });

  return daily;
};

const parseAddress = (addressComponents) => {
  let name = "";
  let hasName = false;

  addressComponents.forEach((component) => {
    let ct = component.types[0];
    if (ct === "postal_town") {
      name = component.short_name;
      hasName = true;
    }
    if (ct === "locality" && !hasName) {
      name = component.short_name;
      hasName = true;
    }
    if (ct == "administrative_area_level_1" && !hasName) {
      name = component.short_name;
      hasName = true;
    }
    if (ct == "administrative_area_level_2" && !hasName) {
      name = component.short_name;
      hasName = true;
    }
  });

  return name;
};

const formatSunMoon = (forecasts, lat, lon) => {
  let astros = forecasts.forecastday.map((forecast) => {
    let astro = forecast.astro;
    let astroTimes = {};

    astroTimes.date = moment(forecast.date_epoch).format("ddd DD");
    illumination = suncalc.getMoonIllumination(forecast.date_epoch, lat, lon);
    astroTimes.fraction = Math.round(illumination.fraction * 100);

    if (astro.sunrise.includes("PM")) {
      let hours = parseInt(astro.sunrise.slice(0, 2)) + 12;
      let minutes = astro.sunrise.slice(3, 5);
      astroTimes.sunrise = `${hours}:${minutes}`
    } else {
      let hours = astro.sunrise.slice(0, 2);
      let minutes = astro.sunrise.slice(3, 5);
      astroTimes.sunrise = `${hours}:${minutes}`
    }

    if (astro.sunset.includes("PM")) {
      let hours = parseInt(astro.sunset.slice(0, 2)) + 12;
      let minutes = astro.sunset.slice(3, 5);
      astroTimes.sunset = `${hours}:${minutes}`
    } else {
      let hours = astro.sunset.slice(0, 2);
      let minutes = astro.sunset.slice(3, 5);
      astroTimes.sunset = `${hours}:${minutes}`
    }

    if (astro.moonrise.includes("PM")) {
      let hours = parseInt(astro.moonrise.slice(0, 2)) + 12;
      let minutes = astro.moonrise.slice(3, 5);
      astroTimes.moonrise = `${hours}:${minutes}`
    } else {
      let hours = astro.moonrise.slice(0, 2);
      let minutes = astro.moonrise.slice(3, 5);
      astroTimes.moonrise = `${hours}:${minutes}`
    }

    if (astro.moonset.includes("PM")) {
      let hours = parseInt(astro.moonset.slice(0, 2)) + 12;
      let minutes = astro.moonset.slice(3, 5);
      astroTimes.moonset = `${hours}:${minutes}`
    } else {
      let hours = astro.moonset.slice(0, 2);
      let minutes = astro.moonset.slice(3, 5);
      astroTimes.moonset = `${hours}:${minutes}`
    }
    return astroTimes
  });

  return astros;
}

module.exports = {
  formatCurrently,
  formatDaily,
  formatHourly,
  parseAddress,
  formatSunMoon
};
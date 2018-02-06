const suncalc = require("suncalc"),
      moment = require("moment");

const formatCurrently = (currentlyRaw) => {
  return {
    date: currentlyRaw.time,
    summary: currentlyRaw.summary,
    icon: currentlyRaw.icon,
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

module.exports = {
  formatCurrently,
  formatDaily,
  formatHourly,
  parseAddress
};
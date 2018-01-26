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

module.exports = {
  formatCurrently,
  formatDaily,
  formatHourly
};
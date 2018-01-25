const axios = require('axios'),
  suncalc = require('suncalc');

const api = (app) => {
  app.get('/api/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      message: 'API is alive'
    }));
  });

  app.get("/api/sunmoon/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let sunTimes = suncalc.getTimes(new Date(), lat, lon);
    let moonTimes = suncalc.getMoonIllumination(new Date(), lat, lon);

    res.json({
      sunTimes,
      moonTimes
    });
  });

  app.get("/api/tides/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;
    let key = process.env.WORLD_TIDES_KEY;

    let url = `https://www.worldtides.info/api?extremes&lat=${lat}&lon=${lon}&key=${key}`;
    axios.get(url)
      .then((result) => {
        let tides = result.data.extremes;
        res.send({
          tides
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/api/locationname/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;
    let key = process.env.GOOGLE_MAPS_KEY;

    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`;
    axios.get(url)
      .then((result) => {
        let addressComponents = result.data.results[0].address_components;
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

        res.send({
          name
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })

  app.get("/api/forecast/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;
    let key = process.env.DARKSKY_KEY;

    let url = `https://api.darksky.net/forecast/${key}/${lat},${lon}?exclude=flags,minutely&units=auto`;
    axios.get(url).then((result) => {
        let currentlyRaw = result.data.currently;
        let hourlyRaw = result.data.hourly.data;
        let dailyRaw = result.data.daily.data;

        let currently = {
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

        let hourly = hourlyRaw.map((weather) => {
          return {
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
        });

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

        res.send({
          currently,
          daily,
          hourly
        })
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = {
  api
};

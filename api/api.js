const axios = require("axios");
const {
        formatCurrently, 
        formatDaily, 
        formatHourly, 
        formatSunMoon, 
        parseAddress} = require("./utils/formatData");
const {config} = require("./config.js");

const api = (app) => {
  app.get("/api/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      message: "API is alive"
    }));
  });

  app.get("/api/sunmoon/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let url = `http://api.apixu.com/v1/forecast.json?key=${config.APIXU_KEY}&q=${lat},${lon}&days=10`;
    axios.get(url)
         .then((result) => {
           let forecasts = result.data.forecast;
           let astroTimes = formatSunMoon(forecasts, lat, lon);
           res.setHeader("Content-Type", "application/json");
           res.send(JSON.stringify({ astroTimes }));
         })
         .catch((err) => {
           console.log("Error fetching sun and moon", err);
           res.status(500).send({ err });
         });
  });

  app.get("/api/tides/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let url = `https://www.worldtides.info/api?extremes&lat=${lat}&lon=${lon}&key=${config.WORLD_TIDES_KEY}`;
    axios.get(url)
      .then((result) => {
        let tides = result.data.extremes;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({
          tides
        }));
      })
      .catch((err) => {
        console.log("Error fetching tides", err);
        res.status(500).send({ err });
      });
  });

  app.get("/api/locationname/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${config.GOOGLE_MAPS_KEY}`;
    axios.get(url)
      .then((result) => {
        let name = parseAddress(result.data.results[0].address_components);

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({
          name
        }));
      })
      .catch((err) => {
        console.log(err); 
        res.status(500).send({ err });
      });
  })

  app.get("/api/forecast/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let url = `https://api.darksky.net/forecast/${config.DARKSKY_KEY}/${lat},${lon}?exclude=flags,minutely&units=si`;

    axios.get(url).then((result) => {
      let currently = formatCurrently(result.data.currently);
      let hourly = formatHourly(result.data.hourly.data)
      let daily = formatDaily(result.data.daily.data)

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({
          currently,
          daily,
          hourly
        }));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ err });
      });
  });
};

module.exports = {
  api
};

const axios = require("axios");
const {
        formatCurrently, 
        formatDaily, 
        formatHourly, 
        formatSunMoon, 
        parseAddress} = require("./utils/formatData");
const {config} = require("./config.js");

const GOOGLE_MAPS_KEY = "AIzaSyBKz2rPCqEm4XguOun_Jn8Ts4EOFSoT9MU";
const WORLD_TIDES_KEY = "f1c67376-3200-41db-86c3-8334b6f81106";
const DARKSKY_KEY = "dd7aee29471de7467a81eb91c6be98d9";
const APIXU_KEY = "daf06d640a404f95b87140505182301";

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

           console.log(astroTimes);
           
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

    let url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lon}?exclude=flags,minutely&units=si`;

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

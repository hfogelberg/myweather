const {formatCurrently, formatDaily, formatHourly} = require("./utils/formatWeather"),
  { parseAddress } = require("./utils/parseAddress"),
      axios = require('axios'),
      { 
        GOOGLE_MAPS_KEY, 
        WORLD_TIDES_KEY, 
        DARKSKY_KEY 
      } = require('./apiConfig.js'),
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
    
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      sunTimes,
      moonTimes
    }));
  });

  app.get("/api/tides/:lat/:lon", (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;

    let url = `https://www.worldtides.info/api?extremes&lat=${lat}&lon=${lon}&key=${WORLD_TIDES_KEY}`;
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

    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_KEY}`;
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

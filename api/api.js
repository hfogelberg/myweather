const axios = require("axios"),
      {
        formatCurrently, 
        formatDaily, 
        formatHourly,
        parseAddress
      } = require("./utils/formatData"),
      suncalc = require('suncalc'),
      GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY,
      WORLD_TIDES_KEY = process.env.WORLD_TIDES_KEY,
      DARKSKY_KEY = process.env.DARKSKY_KEY;

const api = (app) => {
  app.get("/api/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      message: "API is alive"
    }));
  });

  app.get("/api/astro/:lat/:lon", async(req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;

    let date = new Date();
    let astroTimes = [];

    for (let j = 0; j < 7; j++) {
      date.setDate(date.getDate() + 1);
      const sunTimes = suncalc.getTimes(date, lat, lon);
      const illumination = suncalc.getMoonIllumination(date, lat, lon);
      const moon = suncalc.getMoonTimes(date, lat, lon);
      let moonImage = "";
      if (illumination.fraction < .1) {
        moonImage = "new-moon.svg";
      } else if (illumination.fraction < .4) {
        moonImage = "quarter-moon.svg";
      } else if (illumination.fraction < .6) {
        moonImage = "half-moon.svg";
      } else if (illumination.fraction < .9) {
        moonImage = "three-quarter-moon.svg";
      } else {
          moonImage = "full-moon.svg";
      }

      let astro = {
        date: date,
        sunrise: sunTimes.sunrise,
        sunset: sunTimes.sunset,
        moonImage: moonImage,
        fraction: Math.round(illumination.fraction * 100),
        moonrise: moon.rise,
        moonset: moon.set
      };

      astroTimes.push(astro);
    }
  
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ astroTimes }));
  });

  app.get("/api/tides/:lat/:lon", (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const key = process.env.WORLD_TIDES_KEY;
    const url = `https://www.worldtides.info/api?extremes&lat=${lat}&lon=${lon}&key=${key}`;

    axios.get(url)
      .then((result) => {
        let tides = result.data.extremes;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({tides}));
      })
      .catch((err) => {
        console.log("Error fetching tides", err);
        res.status(500).send({ err });
      });
  });

  app.get("/api/locationname/:lat/:lon", (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const key = process.env.GOOGLE_MAPS_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`;

    axios.get(url)
      .then((result) => {
        const name = parseAddress(result.data.results[0].address_components);

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
    const lat = req.params.lat;
    const lon = req.params.lon;
    const key = process.env.DARKSKY_KEY;
    const url = `https://api.darksky.net/forecast/${key}/${lat},${lon}?exclude=flags,minutely&units=si`;

    axios.get(url).then((result) => {
      const currently = formatCurrently(result.data.currently);
      const hourly = formatHourly(result.data.hourly.data)
      const daily = formatDaily(result.data.daily.data)

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

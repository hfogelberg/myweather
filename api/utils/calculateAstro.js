const suncalc = require('suncalc'),
      moment = require('moment');


getMoonIcon = async(fraction) => {
  let moonImage = "";
  switch (fraction) {
    case fraction < 10:
      moonImage = "../public/icons/new-moon.svg";
      break;
    case fraction < 40:
      moonImage = "../public/icons/quarter-moon.svg";
      break;
    case fraction < 60:
      moonImage = "../public/icons/half-moon.svg";
      break;
    case fraction < 90:
      moonImage = "../public/icons/three-quarter-moon.svg";
      break;
    default:
      moonImage = "../public/icons/full-moon.svg";
  }

  return moonImage;
}

const astroCalc = async(lat, lon) => {
  let astros = [];
  let today = new Date();
  for(i=0;i<10;i++) {
    let date = moment(today).add(1, 'day').format();
    
    const sun = suncalc.getTimes(date, lat, lon);
    const illumination = suncalc.getMoonIllumination(date, lat, lon);
    const moon = suncalc.getMoonTimes(date, lat, lon);
    
    let astro = {
      date: moment(today).format("ddd DD"),
      sunrise: moment(sun.sunrise).format("HH:mm"),
      sunset: moment(sun.sunset).format("HH:mm"),
      moonImage: await getMoonIcon(illumination.fraction),
      fraction: Math.round(illumination.fraction * 100),
      moonrise: moment(moon.rise).format("HH:mm"),
      moonset: moment(moon.set).format("HH:mm")
    };

    astros.push(astro);
  }
  return astros
}

module.exports = {astroCalc};

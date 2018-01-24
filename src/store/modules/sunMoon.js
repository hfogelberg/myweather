const axios = require("axios");

const state = {
  sun: {},
  moon: {}
}

const getters = {
  sun: state => {
    return state.sun;
  },

  moon: state => {
    return state.moon;
  }
}

const mutations = {
  setSun: (state, payload) => {
    state.sun = payload;
  },

  setMoon: (state, payload) => {
    state.moon = payload;
  }
}

const actions = {
  getSunMoon(context) {
    var lat = this.getters.lat;
    var lon = this.getters.lon;
    var url = "http://localhost:3000/api/sunmoon/" + lat + "/" + lon;
    console.log(url);

    axios.get(url)
      .then((res) => {
        let sun = res.data.sunTimes;
        let moon = res.data.moonTimes;
        let sunTimes = {
          sunrise: moment(sun.sunrise).local().format("DD HH:mm"),
          sunset: moment(sun.sunset).local().format("DD HH:mm"),
          dawn: moment(sun.dawn).local().format("DD HH:mm"),
          dusk: moment(sun.dusk).local().format("DD HH:mm"),
          solarNoon: moment(sun.solarNoon).local().format("DD HH:mm")
        };
        context.commit("setSun", sunTimes);

      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

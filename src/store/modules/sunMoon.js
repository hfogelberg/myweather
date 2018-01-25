import axios from "axios";
import moment from "moment";
import { API_ROOT_URL } from "./storeConfig.js";

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
    var url = `${API_ROOT_URL}/sunmoon/${lat}/${lon}`;
    axios.get(url)
      .then((res) => {
        let sun = res.data.sunTimes;
        let moon = res.data.moonTimes;
        let sunTimes = {
          sunrise: moment(sun.sunrise).local().format("ddd HH:mm"),
          sunset: moment(sun.sunset).local().format("ddd HH:mm"),
          dawn: moment(sun.dawn).local().format("ddd HH:mm"),
          dusk: moment(sun.dusk).local().format("ddd HH:mm"),
          solarNoon: moment(sun.solarNoon).local().format("ddd HH:mm")
        };

        let moonTimes = {
          phase: Math.round(moon.phase * 100)
        };

        context.commit("setSun", sunTimes);
        context.commit("setMoon", moonTimes);

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

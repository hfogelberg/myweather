import axios from "axios";
import moment from "moment";
import router from '../../router.js';
import { API_ROOT_URL } from "./storeConfig.js";

const state = {
  currently: {},
  daily: [],
  hourly: [],
  hasWeather: false
}

const getters = {
  hasWeather: state => {
    return state.hasWeather;
  },
  currently: state => {
    return state.currently;
  },
  daily: state => {
    return state.daily;
  },
  hourly: state => {
    return state.hourly;
  }
}

const mutations = {
  setHasWeather: (state, payload) => {
    state.hasWeather = payload;
  },

  setCurrently: (state, payload) => {
    // Convert time to local and format
    payload.date = moment.unix(payload.date).local().format("ddd HH");
    state.currently = payload;
  },
  setDaily: (state, payload) => {
    // Convert time to local and format
    let forecasts = payload.map((forecast) => {
      forecast.date = moment.unix(forecast.date).format("ddd DD");
      return forecast;
    })

    state.daily = forecasts;
  },
  setHourly: (state, payload) => {
    // Convert time to local and format
    let forecasts = payload.map((forecast) => {
      forecast.date = moment.unix(forecast.date).format("ddd, HH:00");
      return forecast;
    })
    state.hourly = forecasts;
  }
}

const actions = {
  getForecast(context) {
    let lat = this.getters.lat;
    let lon = this.getters.lon;
    let url = `${API_ROOT_URL}/forecast/${lat}/${lon}`;
    
    axios.get(url)
      .then((res) => {
        context.commit('setCurrently', res.data.currently);
        context.commit('setDaily', res.data.daily);
        context.commit('setHourly', res.data.hourly);
        context.commit('setHasWeather', true);
      })
      .catch((err) => {
        this.$router.push("/error");
      });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

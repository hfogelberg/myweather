const axios = require('axios');

const state = {
  currently: {},
  daily: [],
  hourly: []
}

const getters = {
  currently: state => {
    return state.currently;
  },
  daily: state => {
    console.log("Get daily", state.daily);
    return state.daily;
  },
  hourly: state => {
    return state.hourly;
  }
}

const mutations = {
  setCurrently: (state, payload) => {
    console.log("SET CURRENTLY", payload)
    state.currently = payload;
  },
  setDaily: (state, payload) => {
    console.log("SET DAILY", payload);
    state.daily = payload;
  },
  setHourly: (state, payload) => {
    console.log("SET HOURLY", payload);
    state.hourly = payload;
  }
}

const actions = {
  getForecast(context) {
    var lat = this.getters.lat;
    var lon = this.getters.lon;
    var url = "http://localhost:3000/api/forecast/" + lat + "/" + lon;
    console.log("Calling server " + url);
    axios.get(url)
      .then((res) => {
        console.log("Server response", res.data);
        context.commit('setCurrently', res.data.currently);
        context.commit('setDaily', res.data.daily);
        context.commit('setHourly', res.data.hourly);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

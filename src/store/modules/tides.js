const axios = require("axios");

const state = {
  tides: []
}

const getters = {
  tides: state => {
    return state.tides;
  }
}

const mutations = {
  setTides: (state, payload) => {
    console.log("SET TIDES", payload);
    state.tides = payload;
  }
}

const actions = {
  getTides(context) {
    let lat = this.getters.lat;
    let lon = this.getters.lon;
    var url = `http://localhost:3000/api/tides/${lat}/${lon}`;
    console.log("Calling server " + url);
    axios.get(url)
      .then((res) => {
        console.log("Server response", res.data);
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

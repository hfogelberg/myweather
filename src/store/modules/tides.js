const axios = require("axios"),
  moment = require("moment");

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
    state.tides = payload;
  }
}

const actions = {
  getTides(context) {
    let lat = this.getters.lat;
    let lon = this.getters.lon;
    var url = `http://localhost:3000/api/tides/${lat}/${lon}`;

    axios.get(url)
      .then((res) => {
        let tideData = res.data.tides;
        let tides = tideData.map((tide) => {
          tide.date = moment.unix(tide.dt).local().format("ddd HH:mm");
          return tide;
        });
        context.commit("setTides", tides);
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

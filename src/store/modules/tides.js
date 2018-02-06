import axios from "axios";
import moment from "moment";
import { API_ROOT_URL } from "./storeConfig.js";

const state = {
  tides: [],
  hasTides: false
}

const getters = {
  tides: state => {
    return state.tides;
  },

  hasTides: state => {
    return state.hasTides;
  }
}

const mutations = {
  setTides: (state, payload) => {
    state.tides = payload;
  },

  setHasTides: (state, payload) => {
    state.hasTides = payload;
  }
}

const actions = {
  getTides(context) {
    let lat = this.getters.lat;
    let lon = this.getters.lon;
    var url = `${API_ROOT_URL}/tides/${lat}/${lon}`;

    axios.get(url)
      .then((res) => {
        let tideData = res.data.tides;
        let tides = tideData.map((tide) => {
          tide.height = tide.height.toFixed(2);
          tide.date = moment.unix(tide.dt).local().format("ddd HH:mm");
          return tide;
        });
        context.commit("setTides", tides);
        context.commit("setHasTides", true);
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

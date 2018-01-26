import axios from "axios";
import moment from "moment";
import { API_ROOT_URL } from "./storeConfig.js";

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

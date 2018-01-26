import axios from "axios";
import moment from "moment";
import router from '../../router.js';
import { API_ROOT_URL } from "./storeConfig.js";

const state = {
  astroTimes: []
}

const getters = {
  astroTimes: state => {
    return state.astroTimes;
  },
}

const mutations = {
  setAstroTimes: (state, payload) => {
    state.astroTimes = payload;
  }
}

const actions = {
  getSunMoon(context) {
    var lat = this.getters.lat;
    var lon = this.getters.lon;
    var url = `${API_ROOT_URL}/sunmoon/${lat}/${lon}`;
    axios.get(url)
      .then((res) => {
        let astroTimes = res.data.astroTimes;
        context.commit("setAstroTimes", astroTimes);
      })
      .catch((err) => {
        router.push("/error");
      });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

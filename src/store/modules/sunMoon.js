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
    let lat = this.getters.lat;
    let lon = this.getters.lon;
    let imageRoot = this.getters.imageRootUrl
    let url = `${API_ROOT_URL}/astro/${lat}/${lon}`;
    axios.get(url) 
         .then((res) => {
           console.log(res.data);
           let astros = res.data.astroTimes;
           let astroTimes = astros.map((astro) => {
             let astroTime = {
               date: moment(astro.date).format("ddd Do"),
               sunrise: moment(astro.sunrise).format("HH:mm"),
               sunset: moment(astro.sunset).format("HH:mm"),
               moonrise: moment(astro.moonrise).format("HH:mm"),
               moonset: moment(astro.moonset).format("HH:mm"),
               moonImage: `${imageRoot}${astro.moonImage}`,
               fraction: astro.fraction
             };
             console.log(astroTime);
             return astroTime;
           }) 
           context.commit("setAstroTimes", astroTimes);
         })
        .catch((err) => {
          router.push('/err');
         });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

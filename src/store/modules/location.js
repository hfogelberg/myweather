import axios from "axios";

const state = {
  lat: 0.0,
  lon: 0.0,
  city: "",
  hasCity: false
}

const getters = {
  city: state => {
    return state.city;
  },

  hasCity: state => {
    return state.hasCity;
  },

  lat: state => {
    return state.lat;
  },

  lon: state => {
    return state.lon;
  }
}

const mutations = {
  setLocation: (state, payload) => {
    state.lat = payload.lat;
    state.lon = payload.lon;
  },
  setCity: (state, payload) => {
    state.city = payload;
    state.hasCity = true;
  }
}

const actions = {
  location(context, location) {
    context.commit("setLocation", location);
    var url = "http://localhost:3000/api/locationname/" + location.lat + "/" + location.lon;
    console.log("Calling server " + url);
    axios.get(url)
      .then((res) => {
        context.commit("setCity", res.data.name);
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

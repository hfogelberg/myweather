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

    if (payload) {
      state.hasCity = false;
    } else {
      state.hasCity = true;
    }
  },
  setHasCity: (state, payload) => {
    state.hasCity = payload;
  }
}

const actions = {
  geoAndCity(context, location) {
    console.log("Set geo and city", location);
    context.commit("setLocation", location.geometry);
    context.commit("setCity", location.city);
    context.commit("setHasCity", true);
    context.commit("isSearching", false);
  },

  location(context, location) {
    context.commit("setLocation", location);
    var url = "http://localhost:3000/api/locationname/" + location.lat + "/" + location.lon;
    axios.get(url)
      .then((res) => {
        context.commit("setCity", res.data.name);
        context.commit("setHasCity", true);
        context.commit("isSearching", false);
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

import Vue from 'vue';
import Vuex from 'vuex';
import location from './modules/location';
import forecast from './modules/forecast';
import tides from "./modules/tides";
import sunMoon from "./modules/sunMoon";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isSearching: false
  },

  getters: {
    isSearching: state => {
      return state.isSearching;
    },

    imageRootUrl: state => {
      return "http://res.cloudinary.com/golizzard/image/upload/v1517470891/myweather/";
    }
  },
  
  mutations: {
    isSearching: (state, payload) => {
      state.isSearching = payload
    }
  },
  
  actions: {
    reset: ( context) => {
      context.commit("setCurrently", {});
      context.commit("setDaily", []);
      context.commit("setHourly", []);
      context.commit("setLocation", {lat: 0.0, lon: 0.0 });
      context.commit("setCity", "");
      context.commit("setAstroTimes", []);
      context.commit("setTides", []);
      context.commit("isSearching", false);
      context.commit("setHasCity", false);
    },
    setIsSearching: (context, isSearching) => {
      context.commit("isSearching", isSearching);
    },
    setHasCity: (context, hasCity) => {
      context.commit("setHasCity", false);
    }
  },

  modules: {
    location,
    forecast,
    tides,
    sunMoon
  }
});

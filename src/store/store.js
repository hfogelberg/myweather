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
    }
  },
  mutations: {
    notSearching: state => {
      state.isSearching = false;
    },

    toggleIsSearching: state => {
      state.isSearching = !state.isSearching
    }
  },
  actions: {
    reset: ({
      commit
    }) => {
      commit("setCurrently", {});
      commit("setDaily", []);
      commit("setHourly", []);
      commit("setLocation", {
        lat: 0.0,
        lon: 0.0
      });
      commit("city", "");
      commit("setSun", {});
      commit("setMoon", {});
      commit("setTides", []);
      commit("notSearching");
    },
    setIsSearching: ({
      commit
    }) => {
      commit("toggleIsSearching");
    }
  },
  modules: {
    location,
    forecast,
    tides,
    sunMoon
  }
});

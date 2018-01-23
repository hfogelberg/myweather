import Vue from 'vue';
import Vuex from 'vuex';
import location from './modules/location';
import forecast from './modules/forecast';
import tides from "./modules/tides";

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
    toggleIsSearching: (state) => {
      state.isSearching = !state.isSearching
    }
  },
  actions: {
    setIsSearching: ({
      commit
    }) => {
      commit("toggleIsSearching");
    }
  },
  modules: {
    location,
    forecast,
    tides
  }
});

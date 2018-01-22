import Vue from 'vue';
import Vuex from 'vuex';
import location from './modules/location';
import forecast from './modules/forecast';
import tides from "./modules/tides";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    status: 'SEARCH'
  },
  getters: {
    status: state => {
      return state.status;
    }
  },
  mutations: {
    'SET_STATUS': (state, payload) => {
      status.value = payload;
    }
  },
  actions: {
    updateStatus: ({
      commit
    }, payload) => {
      commit('SET_STATUS', payload);
    }
  },
  modules: {
    location,
    forecast,
    tides
  }
});

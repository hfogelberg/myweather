import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import { store } from './store/store.js'
import App from './App.vue'

Vue.use(VueRouter);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

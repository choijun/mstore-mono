import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import store from './store';
import Viewport from './components/viewport/viewport.vue';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Viewport)
});
import Vue from 'vue';
import Vuex from 'vuex';
import { Observable } from 'rxjs';

Vue.use(Vuex);

const state = {
  products: []
}

const mutations = {
  loadAllProducts(state, products) {
    state.products = products;
  }
}

const actions = {
  init({ commit }) {
    Observable.ajax({
      url: 'api/products',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
    .subscribe({
      next: value => {
        let { response } = value;
        commit('loadAllProducts', response);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
});
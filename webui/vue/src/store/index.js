import Vue from 'vue';
import Vuex from 'vuex';
import { Observable } from 'rxjs';

Vue.use(Vuex);

const state = {
  products: [],
  product: {
    items: [],
    activeItem: {},
    quantity: 0,
  },
}

const mutations = {
  LOAD_ALL_PRODUCT(state, products) {
    state.products = products;
  },
  LOAD_PRODUCT_BY_ID(state, product) {
    state.product = product;
  },
}

const actions = {
  findAllProducts({ commit }) {
    Observable.ajax({
      url: 'api/products',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
    .subscribe({
      next: value => {
        let { response } = value;
        commit('LOAD_ALL_PRODUCT', response);
      },
      error: err => {
        console.error(err);
      }
    });
  },
  findProductById({ commit }, id) {
    Observable.ajax({
      url: `api/products/${id}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    })
    .subscribe({
      next: value => {
        let { response } = value;
        response.activeItem = response.items[0];
        response.quantity = 1;
        commit('LOAD_PRODUCT_BY_ID', response);
      },
      error: err => {
        console.error(err);
      }
    });
  },
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
});
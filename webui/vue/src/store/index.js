import Vue from 'vue';
import Vuex from 'vuex';
import { Observable } from 'rxjs';
import Ajax from '~/core/ajax';

Vue.use(Vuex);

const state = {
  currentUser: {},
  products: [],
  product: {
    items: [],
    activeItem: {},
    quantity: 0,
  },
}

const mutations = {
  AUTHEN(state, currentUser) {
    state.currentUser = currentUser;
  },
  LOAD_ALL_PRODUCT(state, products) {
    state.products = products;
  },
  LOAD_PRODUCT_BY_ID(state, product) {
    product.activeItem = product.items[0];
    product.quantity = 1;
    state.product = product;
  },
}

const actions = {
  async authen({ commit }) {
    commit('AUTHEN', await Ajax.get('api/auth/user'));
  },
  async login({ commit, dispatch }) {
    await Ajax.get('api/login');
    dispatch('authen');
  },
  async logout({ commit }) {
    await Ajax.post('api/logout');
  },
  async findAllProducts({ commit }) {
    commit('LOAD_ALL_PRODUCT', await Ajax.get('api/products'));
  },
  async findProductById({ commit }, id) {
    commit('LOAD_PRODUCT_BY_ID', await Ajax.get(`api/products/${id}`));
  },
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
});
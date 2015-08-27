'use strict';

export default class CartService {
  /* @ngInject */
  constructor($http, Cache) {
    this.$http = $http;
    this.cache = Cache;
  }

  loadCart() {
    return this.$http.get(`api/carts/detail?cartId=${this.cache.get('cartId')}`);
  }
  
  removeCartItem(itemId) {
    return this.$http.delete(`api/carts/items/${itemId}?cartId=${this.cache.get('cartId')}`);
  }
}
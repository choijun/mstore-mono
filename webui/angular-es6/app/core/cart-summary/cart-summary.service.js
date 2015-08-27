'use strict';

export default class CartSummaryService {
  /* @ngInject */
  constructor($http, Cache) {
    this.$http = $http;
    this.cache = Cache;
  }
  
  createCartId() {
    return this.$http({
      url: 'api/carts/cart-id',
      method: 'GET',
      transformResponse: response => response
    }).then(response => this.cache.set('cartId', response.data));
  }

  getTotalItems() {
    return this.$http.get(`api/carts/total-items?cartId=${this.cache.get('cartId')}`);
  }
}
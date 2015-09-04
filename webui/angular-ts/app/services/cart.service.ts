/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.service
  export class CartService {
    $http: ng.IHttpService;
    cacheService: mstore.CacheService;
    
    /* @ngInject */
    constructor($http, CacheService) {
      this.$http = $http;
      this.cacheService = CacheService;
    }
  
    loadCart() {
      return this.$http.get(`api/carts/detail?cartId=${this.cacheService.get('cartId')}`);
    }
    
    removeCartItem(itemId) {
      return this.$http.delete(`api/carts/items/${itemId}?cartId=${this.cacheService.get('cartId')}`);
    }
    
    createCartId() {
      return this.$http({
        url: 'api/carts/cart-id',
        method: 'GET',
        transformResponse: response => response
      }).then(response => this.cacheService.set('cartId', response.data));
    }
  
    getTotalItems() {
      return this.$http.get(`api/carts/total-items?cartId=${this.cacheService.get('cartId')}`);
    }
  }
}
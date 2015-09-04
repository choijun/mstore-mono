/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class CartService {
    $http: ng.IHttpService;
    cacheService: mstore.CacheService;
    
    /* @ngInject */
    constructor($http: ng.IHttpService, CacheService) {
      this.$http = $http;
      this.cacheService = CacheService;
    }
  
    loadCart() {
      return this.$http.get(`api/carts/detail?cartId=${this.cacheService.get('cartId')}`);
    }
    
    removeCartItem(itemId: string) {
      return this.$http.delete(`api/carts/items/${itemId}?cartId=${this.cacheService.get('cartId')}`);
    }
    
    createCartId() {
      return this.$http({
        url: 'api/carts/cart-id',
        method: 'GET',
        transformResponse: response => response
      }).then((response: mstore.IApiResponse) => this.cacheService.set('cartId', response.data));
    }
  
    getTotalItems() {
      return this.$http.get(`api/carts/total-items?cartId=${this.cacheService.get('cartId')}`);
    }
  }
  
  angular.module('mstore.services').service('CartService', CartService);
}
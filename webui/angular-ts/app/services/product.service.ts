/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="cache.service.ts"/>

module mstore {
  'use strict';

  export class ProductService {
    $http: ng.IHttpService;
    cacheService: mstore.CacheService;
    
    /* @ngInject */
    constructor($http: ng.IHttpService, CacheService: mstore.CacheService) {
      this.$http = $http;
      this.cacheService = CacheService;
    }
  
    getProducts() {
      return this.$http.get('api/products');
    }
  
    getProductById(id: string) {
      return this.$http.get(`api/products/${id}`);
    }
    
    addCartItem(itemId: string, quantity: number) {
      var cartItem = {
        cartId: this.cacheService.get('cartId'),
        itemId: itemId,
        quantity: quantity
      };
      return this.$http.post(`api/carts/items?cartId=${cartItem.cartId}`, cartItem);
    }
  }
  
  angular.module('mstore.services').service('ProductService', ProductService);
}
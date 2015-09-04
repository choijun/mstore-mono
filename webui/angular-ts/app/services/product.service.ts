/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="cache.service.ts"/>

module mstore {
  'use strict';
  
  @mstore.service
  export class ProductService {
    $http: ng.IHttpService;
    cacheService: mstore.CacheService;
    
    /* @ngInject */
    constructor($http, CacheService) {
      this.$http = $http;
      this.cacheService = CacheService;
    }
  
    getProducts() {
      return this.$http.get('api/products');
    }
  
    getProductById(id) {
      return this.$http.get(`api/products/${id}`);
    }
    
    addCartItem(itemId, quantity) {
      var cartItem = {
        cartId: this.cacheService.get('cartId'),
        itemId: itemId,
        quantity: quantity
      };
      return this.$http.post(`api/carts/items?cartId=${cartItem.cartId}`, cartItem);
    }
  }
}
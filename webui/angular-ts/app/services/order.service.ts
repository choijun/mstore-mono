/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class OrderService {
    $http: ng.IHttpService;
    cacheService: mstore.CacheService;
    
    /* @ngInject */
    constructor($http: ng.IHttpService, CacheService: mstore.CacheService) {
      this.$http = $http;
      this.cacheService = CacheService;
    }
  
    getOrders() {
      return this.$http.get('api/orders');
    }
  
    previewOrder() {
      return this.$http.get(`api/orders/preview-order?cartId=${this.cacheService.get('cartId')}`);
    }
  
    placeOrder(shippingAddressId: string, billingAddressId: string) {
      return this.$http({
        url: `api/orders?shippingAddressId=${shippingAddressId}&billingAddressId=${billingAddressId}`,
        method: 'PUT',
        transformResponse: response => response
      });
    }
  }
  
  angular.module('mstore.services').service('OrderService', OrderService);
}
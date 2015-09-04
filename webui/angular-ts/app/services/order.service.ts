/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.service
  export class OrderService {
    $http: ng.IHttpService;
    cacheService: mstore.CacheService;
    
    /* @ngInject */
    constructor($http, CacheService) {
      this.$http = $http;
      this.cacheService = CacheService;
    }
  
    getOrders() {
      return this.$http.get('api/orders');
    }
  
    previewOrder() {
      return this.$http.get(`api/orders/preview-order?cartId=${this.cacheService.get('cartId')}`);
    }
  
    placeOrder(shippingAddressId, billingAddressId) {
      return this.$http({
        url: `api/orders?shippingAddressId=${shippingAddressId}&billingAddressId=${billingAddressId}`,
        method: 'PUT',
        transformResponse: response => response
      });
    }
  }
}
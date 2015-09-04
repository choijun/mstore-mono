/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

module mstore {
  'use strict';

  export class CheckoutController {
    orderService: mstore.OrderService;
    cacheService: mstore.CacheService;
    $rootScope: ng.IRootScopeService;
    $modal: ng.ui.bootstrap.IModalService;
    data: any;
    orderId: string;
    
    /* @ngInject */
    constructor(OrderService: mstore.OrderService, 
                CacheService: mstore.CacheService, 
                $rootScope: ng.IRootScopeService, 
                $modal: ng.ui.bootstrap.IModalService) {
      this.orderService = OrderService;
      this.cacheService = CacheService;
      this.$rootScope = $rootScope;
      this.$modal = $modal;
      this.data = { details: [] };
      
      if (this.cacheService.get('loginUser')) {
        this.previewOrder();
      } else {
        this.$rootScope.$broadcast('login', this.previewOrder.bind(this));
      }
    }
  
    previewOrder() {
      this.orderService.previewOrder().then((response: mstore.IApiResponse) => this.data = response.data);
    }
  
    placeOrder() {
      this.orderService.placeOrder(this.data.shippingAddressId, this.data.billingAddressId)
      .then((response: mstore.IApiResponse) => {
        this.orderId = response.data;
        this.cacheService.remove('cartId');
        this.$rootScope.$broadcast('updateCart');
        this.$modal.open({
          animation: true,
          templateUrl: 'app/common/order-result/order-result.html',
          controller: 'OrderResultController as orderResult',
          resolve: {
            orderId: () => { return this.orderId; }
          }
        });
      });
    }
  }
  
  angular.module('mstore').controller('CheckoutController', CheckoutController);
}
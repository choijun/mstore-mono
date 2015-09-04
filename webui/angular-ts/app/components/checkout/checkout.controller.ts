/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

module mstore {
  'use strict';
  
  @mstore.controller
  export class CheckoutController {
    orderService: mstore.OrderService;
    cacheService: mstore.CacheService;
    $rootScope: ng.IRootScopeService;
    $modal: ng.ui.bootstrap.IModalService;
    data: any;
    orderId: string;
    
    /* @ngInject */
    constructor(OrderService, CacheService, $rootScope, $modal) {
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
      this.orderService.previewOrder().then(response => this.data = response.data);
    }
  
    placeOrder() {
      this.orderService.placeOrder(this.data.shippingAddressId, this.data.billingAddressId)
      .then(response => {
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
}
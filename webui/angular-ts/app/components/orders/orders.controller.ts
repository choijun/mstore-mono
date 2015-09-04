/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class OrdersController {
    data: any;
    
    /* @ngInject */
    constructor(OrderService: mstore.OrderService) {
      OrderService.getOrders().then((response: mstore.IApiResponse) => this.data = response.data);
    }
  }
  
  angular.module('mstore').controller('OrdersController', OrdersController);
}
/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class OrdersController {
    data: any;
    
    /* @ngInject */
    constructor(OrderService) {
      OrderService.getOrders().then(response => this.data = response.data);
    }
  }
  
  angular.module('mstore').controller('OrdersController', OrdersController);
}
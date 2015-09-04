/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.controller
  export class OrdersController {
    /* @ngInject */
    constructor(OrderService) {
      OrderService.getOrders().then(response => this.data = response.data);
    }
  }
}
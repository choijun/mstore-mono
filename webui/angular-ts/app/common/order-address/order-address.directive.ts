/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class OrderAddress {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/order-address/order-address.html',
        scope: true,
        controller: () => { },
        controllerAs: 'orderAddress',
        bindToController: {
          address: '=orderAddress'
        }
      };
    }
  }
  
  angular.module('mstore.common').directive('orderAddress', () => new OrderAddress());
}
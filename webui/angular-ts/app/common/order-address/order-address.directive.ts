/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.directive
  export class OrderAddress {
  constructor() {
    return {
      replace: true,
      templateUrl: 'app/common/order-address/order-address.html',
      scope: true,
      controller: function () { },
      controllerAs: 'orderAddress',
      bindToController: {
        address: '=orderAddress'
      }
    };
  }
}
}
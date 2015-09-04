/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.directive
  export class CartEmpty {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/cart-empty/cart-empty.html',
        scope: true,
        controller: () => { },
        controllerAs: 'cartEmpty',
        bindToController: {
          productId: '='
        }
      };
    }
  }
}
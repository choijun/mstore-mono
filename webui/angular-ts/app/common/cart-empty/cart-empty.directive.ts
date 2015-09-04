/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class CartEmpty {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/cart-empty/cart-empty.html'
      };
    }
  }
  
  angular.module('mstore.common').directive('cartEmpty', () => new CartEmpty());
}
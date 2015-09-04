/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class CartController {
    cartService: mstore.CartService;
    $rootScope: ng.IRootScopeService;
    data: any;
    
    /* @ngInject */
    constructor(CartService: mstore.CartService, $rootScope: ng.IRootScopeService) {
      this.cartService = CartService;
      this.$rootScope = $rootScope;
      this.data = { details: [] };
      this.loadCart();
    }
  
    loadCart() {
      this.cartService.loadCart().then((response: mstore.IApiResponse) => this.data = response.data);
    }
    
    removeItem(itemId: string) {
      this.cartService.removeCartItem(itemId).then(() => {
        this.loadCart();
        this.$rootScope.$broadcast('updateCart');
      });
    }
  }
  
  angular.module('mstore').controller('CartController', CartController);
}
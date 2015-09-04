/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.controller
  export class CartController {
    cartService: mstore.CartService;
    $rootScope: ng.IRootScopeService;
    data: any;
    
    /* @ngInject */
    constructor(CartService, $rootScope) {
      this.cartService = CartService;
      this.$rootScope = $rootScope;
      this.data = { details: [] };
      this.loadCart();
    }
  
    loadCart() {
      this.cartService.loadCart().then(response => this.data = response.data);
    }
    
    removeItem(itemId) {
      this.cartService.removeCartItem(itemId).then(() => {
        this.loadCart();
        this.$rootScope.$broadcast('updateCart');
      });
    }
  }
}
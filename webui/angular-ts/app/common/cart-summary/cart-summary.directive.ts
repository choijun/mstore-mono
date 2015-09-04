/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  class CartSummaryController {
    cartService: mstore.CartService;
    cacheService: mstore.CacheService;
    $rootScope: ng.IRootScopeService;
    quantity: number;
    
    /* @ngInject */
    constructor(CartService, CacheService, $rootScope) {
      this.cartService = CartService;
      this.cacheService = CacheService;
      this.updateCartSummary();
      $rootScope.$on('updateCart', () => this.updateCartSummary());
    }
  
    updateCartSummary() {
      if (this.cacheService.get('cartId')) {
        this.cartService.getTotalItems()
        .then(response => this.quantity = response.data)
        .catch(() => this.createNewCart());
      } else {
        this.createNewCart();
      }
    }
  
    createNewCart() {
      this.cartService.createCartId();
      this.quantity = 0;
    }
  }
  
  @mstore.directive
  export class CartSummary {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/cart-summary/cart-summary.html',
        scope: true,
        controller: CartSummaryController,
        controllerAs: 'cartSummary'
      };
    }
  }
}
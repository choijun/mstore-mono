(function () {
  'use strict';

  /* @ngInject */
  function CartController(CartService, $rootScope) {
    this.cartService = CartService;
    this.$rootScope = $rootScope;
    this.cart = { details: [] };
    this.loadCart();
  }

  CartController.prototype.loadCart = function() {
    this.cartService.loadCart()
    .then(function(response) {
      this.cart = response.data;
    }.bind(this));
  };
  
  CartController.prototype.removeItem = function(itemId) {
    this.cartService.removeCartItem(itemId).then(function() {
      this.loadCart();
      this.$rootScope.$broadcast('updateCart');
    }.bind(this));
  };

  angular.module('mstore.cart').controller('CartController', CartController);
})();

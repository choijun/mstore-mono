(function () {
  'use strict';

  /* @ngInject */
  function CartController(CartService) {
    this.cartService = CartService;
    this.cart = {
      details: []
    };
    this.loadCart();
  }

  CartController.prototype.loadCart = function() {
    this.cartService.loadCart()
    .then(function(response) {
      this.cart = response;
    }.bind(this));
  };

  angular.module('mstore').controller('CartController', CartController);
})();

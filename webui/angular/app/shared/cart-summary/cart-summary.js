(function () {
  'use strict';

  angular.module('mstore').directive('cartSummary', CartSummary);

  function CartSummary() {
    return {
      controller: CartSummaryController,
      controllerAs: 'ctrl',
      scope: true,
      replace: true,
      templateUrl: 'app/shared/cart-summary/cart-summary.tpl.html'
    };
  }

  /* ngInject */
  function CartSummaryController(CartService, Cache, PubSub) {
    this.cartService = CartService;
    this.cache = Cache;
    PubSub.subscribe('updateCart', this.updateCartSummary.bind(this));
    this.updateCartSummary();
  }

  CartSummaryController.prototype.updateCartSummary = function() {
    if (this.cache.get('cartId')) {
      this.cartService.getTotalItems()
      .then(function(response) {
        this.quantity = response.totalItems;
      }.bind(this))
      .catch(function() {
        this.createNewCart();
      }.bind(this));
    } else {
      this.createNewCart();
    }
  };

  CartSummaryController.prototype.createNewCart = function() {
    this.cartService.setCartId();
    this.quantity = 0;
  };
})();

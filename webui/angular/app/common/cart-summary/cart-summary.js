(function () {
  'use strict';

  /* @ngInject */
  function CartSummaryController(CartService, CacheService, $rootScope) {
    this.cartService = CartService;
    this.cacheService = CacheService;
    this.updateCartSummary();
    $rootScope.$on('updateCart', function() { this.updateCartSummary(); }.bind(this));
  }

  CartSummaryController.prototype.updateCartSummary = function() {
    if (this.cacheService.get('cartId')) {
      this.cartService.getTotalItems()
      .then(function(response) { this.quantity = response.data; }.bind(this))
      .catch(function() { this.createNewCart(); }.bind(this));
    } else {
      this.createNewCart();
    }
  };

  CartSummaryController.prototype.createNewCart = function() {
    this.cartService.createCartId();
    this.quantity = 0;
  };
  
  function CartSummary() {
    return {
      controller: CartSummaryController,
      controllerAs: 'cartSummary',
      scope: true,
      replace: true,
      templateUrl: 'app/common/cart-summary/cart-summary.html'
    };
  }
  
  angular.module('mstore.common').directive('cartSummary', CartSummary);
})();
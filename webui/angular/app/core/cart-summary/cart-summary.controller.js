(function () {
  'use strict';

  /* @ngInject */
  function CartSummaryController(CartSummaryService, Cache, $rootScope) {
    this.cartSummaryService = CartSummaryService;
    this.cache = Cache;
    this.updateCartSummary();
    $rootScope.$on('updateCart', function() { this.updateCartSummary(); }.bind(this));
  }

  CartSummaryController.prototype.updateCartSummary = function() {
    if (this.cache.get('cartId')) {
      this.cartSummaryService.getTotalItems()
      .then(function(response) { this.quantity = response.data; }.bind(this))
      .catch(function() { this.createNewCart(); }.bind(this));
    } else {
      this.createNewCart();
    }
  };

  CartSummaryController.prototype.createNewCart = function() {
    this.cartSummaryService.createCartId();
    this.quantity = 0;
  };
  
  angular.module('mstore.core').controller('CartSummaryController', CartSummaryController);
})();

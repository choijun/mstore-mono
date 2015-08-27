(function () {
  'use strict';

  function CartSummary() {
    return {
      controller: 'CartSummaryController as ctrl',
      scope: true,
      replace: true,
      templateUrl: 'app/core/cart-summary/cart-summary.tpl.html'
    };
  }
  
  angular.module('mstore.core').directive('cartSummary', CartSummary);
})();

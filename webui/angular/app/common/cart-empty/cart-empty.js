(function () {
  'use strict';
  
  function CartEmpty() {
    return {
      controller: function() { },
      controllerAs: 'cartEmpty',
      scope: true,
      replace: true,
      templateUrl: 'app/common/cart-empty/cart-empty.html'
    };
  }
  
  angular.module('mstore.common').directive('cartEmpty', CartEmpty);
})();
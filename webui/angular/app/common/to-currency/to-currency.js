(function () {
  'use strict';

  function toCurrency() {
    return function(amount) {
      return '$ ' + (amount / 100).toFixed(2);
    };
  }

  angular.module('mstore.common').filter('toCurrency', toCurrency);
})();
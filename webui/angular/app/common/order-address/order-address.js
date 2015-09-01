(function () {
  'use strict';

  function OrderAddress() {
    return {
      controller: function () { },
      controllerAs: 'orderAddress',
      bindToController: {
        address: '=orderAddress'
      },
      scope: true,
      replace: true,
      templateUrl: 'app/common/order-address/order-address.html'
    };
  }
  
  angular.module('mstore.common').directive('orderAddress', OrderAddress);
})();

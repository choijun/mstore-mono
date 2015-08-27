(function () {
  'use strict';

  function OrderAddress() {
    return {
      controller: function () { },
      controllerAs: 'dctrl',
      bindToController: {
        address: '=orderAddress'
      },
      scope: true,
      replace: true,
      templateUrl: 'app/order/order-address.tpl.html'
    };
  }
  
  angular.module('mstore.order').directive('orderAddress', OrderAddress);
})();

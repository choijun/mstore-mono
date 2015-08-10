(function () {
  'use strict';

  angular.module('mstore').directive('orderAddress', OrderAddress);

  function OrderAddress() {
    return {
      controller: OrderAddressController,
      controllerAs: 'dctrl',
      bindToController: {
        address: '=orderAddress'
      },
      scope: true,
      replace: true,
      templateUrl: 'app/areas/order/order-address.tpl.html'
    };
  }

  function OrderAddressController() { }
})();

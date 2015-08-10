(function () {
  'use strict';

  angular.module('mstore').controller('OrderController', OrderController);

  /* @ngInject */
  function OrderController(OrderService) {
    OrderService.getOrders()
    .then(function(response) {
      this.orders = response;
    }.bind(this));
  }
})();

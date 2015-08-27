(function () {
  'use strict';

  /* @ngInject */
  function OrderController(OrderService) {
    OrderService.getOrders()
    .then(function(response) { this.orders = response.data; }.bind(this));
  }
  
  angular.module('mstore.order').controller('OrderController', OrderController);
})();

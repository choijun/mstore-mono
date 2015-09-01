(function () {
  'use strict';

  /* @ngInject */
  function OrdersController(OrderService) {
    OrderService.getOrders()
    .then(function(response) { this.data = response.data; }.bind(this));
  }
  
  angular.module('mstore').controller('OrdersController', OrdersController);
})();

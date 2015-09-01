(function () {
  'use strict';

  /* @ngInject */
  function OrderResultController($modalInstance, $location, orderId) {
    this.orderId = orderId;
    this.modalInstance = $modalInstance;
    this.location = $location;
  }

  OrderResultController.prototype.ok = function() {
    this.modalInstance.close();
    this.location.path('/');
  };
  
  angular.module('mstore.common').controller('OrderResultController', OrderResultController);
})();

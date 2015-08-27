(function () {
  'use strict';

  /* @ngInject */
  function OrderResultModalController($modalInstance, $location, orderId) {
    this.orderId = orderId;
    this.modalInstance = $modalInstance;
    this.location = $location;
  }

  OrderResultModalController.prototype.ok = function() {
    this.modalInstance.close();
    this.location.path('/');
  };
  
  angular.module('mstore.order').controller('OrderResultModalController', OrderResultModalController);
})();

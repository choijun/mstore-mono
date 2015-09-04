/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  export class OrderResultController {
    $modalInstance: ng.ui.bootstrap.IModalServiceInstance;
    $location: ng.ILocationService;
    orderId: string;
    
    /* @ngInject */
    constructor($modalInstance, $location, orderId) {
      this.$modalInstance = $modalInstance;
      this.$location = $location;
      this.orderId = orderId;
    }
  
    ok() {
      this.$modalInstance.close();
      this.$location.path('/');
    }
  }
  
  angular.module('mstore.common').controller('OrderResultController', OrderResultController);
}
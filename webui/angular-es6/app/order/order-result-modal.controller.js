'use strict';

export default class OrderResultModalController {
  /* @ngInject */
  constructor($modalInstance, $location, orderId) {
    this.orderId = orderId;
    this.modalInstance = $modalInstance;
    this.location = $location;
  }

  ok() {
    this.modalInstance.close();
    this.location.path('/');
  }
}

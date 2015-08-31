'use strict';

export default class OrderAddress {
  constructor() {
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
}
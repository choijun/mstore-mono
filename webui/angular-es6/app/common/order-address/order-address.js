'use strict';

export default class OrderAddress {
  constructor() {
    return {
      replace: true,
      scope: true,
      bindToController: {
        address: '=orderAddress'
      },
      controller: function () { },
      controllerAs: 'orderAddress',
      templateUrl: 'app/common/order-address/order-address.html'
    };
  }
}
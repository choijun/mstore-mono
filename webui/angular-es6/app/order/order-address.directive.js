'use strict';

export default class OrderAddress {
  constructor() {
    return {
      controller: function () { },
      controllerAs: 'dctrl',
      bindToController: {
        address: '=orderAddress'
      },
      scope: true,
      replace: true,
      templateUrl: 'app/order/order-address.tpl.html'
    };
  }
}

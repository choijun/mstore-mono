'use strict';

export default class OrderAddressController {
  constructor() { }
}

export default class OrderAddress {
  constructor() {
    return {
      controller: 'OrderAddressController as dctrl',
      bindToController: {
        address: '=orderAddress'
      },
      scope: true,
      replace: true,
      templateUrl: 'app/areas/order/order-address.tpl.html'
    };
  }
}

'use strict';

export default class CartEmpty {
  constructor() {
    return {
      controller: () => { },
      controllerAs: 'cartEmpty',
      bindToController: {
        productId: '='
      },
      scope: true,
      replace: true,
      templateUrl: 'app/common/cart-empty/cart-empty.html'
    };
  }
}
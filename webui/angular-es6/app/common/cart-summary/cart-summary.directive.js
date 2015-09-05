'use strict';

import CartSummaryController from './cart-summary.controller';

export default class CartSummary {
  /* @ngInject */
  constructor() {
    return {
      replace: true,
      scope: true,
      controller: CartSummaryController,
      controllerAs: 'cartSummary',
      templateUrl: 'app/common/cart-summary/cart-summary.html'
    };
  }
}
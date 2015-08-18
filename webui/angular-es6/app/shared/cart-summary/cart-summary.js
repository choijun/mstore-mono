'use strict';

export default class CartSummary {
  /* @ngInject */
  constructor() {
    return {
      controller: 'CartSummaryController as ctrl',
      scope: true,
      replace: true,
      templateUrl: 'app/shared/cart-summary/cart-summary.tpl.html'
    };
  }
}

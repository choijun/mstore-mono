'use strict';

export default class CartSummaryController {
  /* @ngInject */
  constructor(CartSummaryService, Cache, $rootScope) {
    this.cartSummaryService = CartSummaryService;
    this.cache = Cache;
    this.updateCartSummary();
    $rootScope.$on('updateCart', () => this.updateCartSummary());
  }

  updateCartSummary() {
    if (this.cache.get('cartId')) {
      this.cartSummaryService.getTotalItems()
      .then(response => this.quantity = response.data)
      .catch(() => this.createNewCart());
    } else {
      this.createNewCart();
    }
  }

  createNewCart() {
    this.cartSummaryService.createCartId();
    this.quantity = 0;
  }
}
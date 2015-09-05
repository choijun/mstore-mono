'use strict';

export default class CartSummaryController {
  /* @ngInject */
  constructor(CartService, CacheService, $rootScope) {
    this.cartService = CartService;
    this.cacheService = CacheService;
    this.updateCartSummary();
    $rootScope.$on('updateCart', () => this.updateCartSummary());
  }

  updateCartSummary() {
    if (this.cacheService.get('cartId')) {
      this.cartService.getTotalItems()
      .then(response => this.quantity = response.data)
      .catch(() => this.createNewCart());
    } else {
      this.createNewCart();
    }
  }

  createNewCart() {
    this.cartService.createCartId();
    this.quantity = 0;
  }
}
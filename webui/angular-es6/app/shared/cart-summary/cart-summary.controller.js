'use strict';

export default class CartSummaryController {
  /* ngInject */
  constructor(CartService, Cache, PubSub) {
    this.cartService = CartService;
    this.cache = Cache;
    PubSub.subscribe('updateCart', this.updateCartSummary.bind(this));
    this.updateCartSummary();
  }

  updateCartSummary() {
    if (this.cache.get('cartId')) {
      this.cartService.getTotalItems()
      .then(response => this.quantity = response.totalItems)
      .catch(() => this.createNewCart());
    } else {
      this.createNewCart();
    }
  }

  createNewCart() {
    this.cartService.setCartId();
    this.quantity = 0;
  }
}

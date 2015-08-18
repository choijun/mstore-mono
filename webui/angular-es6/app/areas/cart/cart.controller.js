'use strict';

export default class CartController {
  /* @ngInject */
  constructor(CartService) {
    this.cartService = CartService;
    this.cart = { details: [] };
    this.loadCart();
  }

  loadCart() {
    this.cartService.loadCart().then(response => this.cart = response);
  }
}

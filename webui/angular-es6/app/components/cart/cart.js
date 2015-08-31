'use strict';

export default class CartController {
  /* @ngInject */
  constructor(CartService, $rootScope) {
    this.cartService = CartService;
    this.$rootScope = $rootScope;
    this.cart = { details: [] };
    this.loadCart();
  }

  loadCart() {
    this.cartService.loadCart().then(response => this.data = response.data);
  }
  
  removeItem(itemId) {
    this.cartService.removeCartItem(itemId).then(() => {
      this.loadCart();
      this.$rootScope.$broadcast('updateCart');
    });
  }
}
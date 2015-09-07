'use strict';

export default class CartController {
  /* @ngInject */
  constructor(CartService, $rootScope, toCurrency) {
    this.cartService = CartService;
    this.$rootScope = $rootScope;
    this.toCurrency = toCurrency;
    this.data = { details: [] };
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
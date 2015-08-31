'use strict';

class CartSummaryController {
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

export default class CartSummary {
  /* @ngInject */
  constructor() {
    return {
      controller: CartSummaryController,
      controllerAs: 'cartSummary',
      scope: true,
      replace: true,
      templateUrl: 'app/common/cart-summary/cart-summary.html'
    };
  }
}
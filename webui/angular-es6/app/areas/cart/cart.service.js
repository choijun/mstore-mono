'use strict';

export default class CartService {
  /* @ngInject */
  constructor(Storage, Cache, PubSub) {
    this.repository = Storage.Carts;
    this.cache = Cache;
    this.pubsub = PubSub;
  }

  setCartId() {
    this.repository.getCartId().$promise.then(response => this.cache.set('cartId', response.cartId));
  }

  getTotalItems() {
    return this.repository.getTotalItems({ cartId: this.cache.get('cartId') }).$promise;
  }

  addCartItem(itemId, quantity) {
    var cartItem = {
      cartId: this.cache.get('cartId'),
      itemId: itemId,
      quantity: quantity
    };
    this.repository.post(cartItem).$promise.then(() => this.pubsub.publish('updateCart'));
  }

  loadCart() {
    return this.repository.query({ cartId: this.cache.get('cartId') }).$promise;
  }
}

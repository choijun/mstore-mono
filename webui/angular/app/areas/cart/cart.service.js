(function () {
  'use strict';

  /* @ngInject */
  function CartService(Storage, Cache, PubSub) {
    this.repository = Storage.Carts;
    this.cache = Cache;
    this.pubsub = PubSub;
  }

  CartService.prototype.setCartId = function() {
    this.repository.getCartId().$promise
    .then(function(response) {
      this.cache.set('cartId', response.cartId);
    }.bind(this));
  };

  CartService.prototype.getTotalItems = function() {
    return this.repository.getTotalItems({ cartId: this.cache.get('cartId') }).$promise;
  };

  CartService.prototype.addCartItem = function(itemId, quantity) {
    var cartItem = {
      cartId: this.cache.get('cartId'),
      itemId: itemId,
      quantity: quantity
    };
    this.repository.post(cartItem).$promise
    .then(function() {
      this.pubsub.publish('updateCart');
    }.bind(this));
  };

  CartService.prototype.loadCart = function() {
    return this.repository.query({ cartId: this.cache.get('cartId') }).$promise;
  };

  angular.module('mstore').service('CartService', CartService);
})();

(function () {
  'use strict';

  /* @ngInject */
  function ProductService($http, CacheService, $filter) {
    this.$http = $http;
    this.cacheService = CacheService;
    this.$filter = $filter;
  }

  ProductService.prototype.getProducts = function() {
    return this.$http.get('api/products');
  };

  ProductService.prototype.getProductById = function(id) {
    return this.$http.get(this.$filter('format')('api/products/{0}', id));
  };
  
  ProductService.prototype.addCartItem = function(itemId, quantity) {
    var cartItem = {
      cartId: this.cacheService.get('cartId'),
      itemId: itemId,
      quantity: quantity
    };
    return this.$http.post(this.$filter('format')('api/carts/items?cartId={0}', cartItem.cartId), cartItem);
  };

  angular.module('mstore.services').service('ProductService', ProductService);
})();

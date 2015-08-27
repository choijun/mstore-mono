(function () {
  'use strict';

  /* @ngInject */
  function CartService($http, Cache, $filter) {
    this.$http = $http;
    this.cache = Cache;
    this.$filter = $filter;
  }

  CartService.prototype.loadCart = function() {
    return this.repository.query({ cartId: this.cache.get('cartId') }).$promise;
  };
  
  CartService.prototype.loadCart = function() {
    return this.$http.get(this.$filter('format')('api/carts/detail?cartId={0}',this.cache.get('cartId')));
  };
  
  CartService.prototype.removeCartItem = function(itemId) {
    return this.$http.delete(this.$filter('format')('api/carts/items/{0}?cartId={1}', itemId, this.cache.get('cartId')));
  };

  angular.module('mstore.cart').service('CartService', CartService);
})();

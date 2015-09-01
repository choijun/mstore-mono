(function () {
  'use strict';

  /* @ngInject */
  function CartService($http, CacheService, $filter) {
    this.$http = $http;
    this.cacheService = CacheService;
    this.$filter = $filter;
  }
  
  CartService.prototype.loadCart = function() {
    return this.$http.get(this.$filter('format')('api/carts/detail?cartId={0}',this.cacheService.get('cartId')));
  };
  
  CartService.prototype.removeCartItem = function(itemId) {
    return this.$http.delete(this.$filter('format')('api/carts/items/{0}?cartId={1}', itemId, this.cacheService.get('cartId')));
  };
  
  CartService.prototype.createCartId = function() {
    return this.$http({
      url: 'api/carts/cart-id',
      method: 'GET',
      transformResponse: function(response) { return response; }
    }).then(function(response) { 
      this.cacheService.set('cartId', response.data); 
    }.bind(this));
  };

  CartService.prototype.getTotalItems = function() {
    return this.$http.get(this.$filter('format')('api/carts/total-items?cartId={0}', this.cacheService.get('cartId')));
  };

  angular.module('mstore.services').service('CartService', CartService);
})();

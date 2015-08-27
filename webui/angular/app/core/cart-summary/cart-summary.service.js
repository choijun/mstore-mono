(function () {
  'use strict';

  /* @ngInject */
  function CartSummaryService($http, Cache, $filter) {
    this.$http = $http;
    this.cache = Cache;
    this.$filter = $filter;
  }
  
  CartSummaryService.prototype.createCartId = function() {
    return this.$http({
      url: 'api/carts/cart-id',
      method: 'GET',
      transformResponse: function(response) { return response; }
    }).then(function(response) { 
      this.cache.set('cartId', response.data); 
    }.bind(this));
  };

  CartSummaryService.prototype.getTotalItems = function() {
    return this.$http.get(this.$filter('format')('api/carts/total-items?cartId={0}', this.cache.get('cartId')));
  };
  
  angular.module('mstore.core').service('CartSummaryService', CartSummaryService);
})();

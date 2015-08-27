(function () {
  'use strict';

  /* @ngInject */
  function OrderService($http, Cache, $filter) {
    this.$http = $http;
    this.cache = Cache;
    this.$filter = $filter;
  }

  OrderService.prototype.getOrders = function() {
    return this.$http.get('api/orders');
  };

  OrderService.prototype.previewOrder = function() {
    return this.$http.get(this.$filter('format')('api/orders/preview-order?cartId={0}', this.cache.get('cartId')));
  };

  OrderService.prototype.placeOrder = function(shippingAddressId, billingAddressId) {
    return this.$http({
      url: this.$filter('format')('api/orders?shippingAddressId={0}&billingAddressId={1}', shippingAddressId, billingAddressId),
      method: 'PUT',
      transformResponse: function(response) { return response; }
    });
  };

  angular.module('mstore.order').service('OrderService', OrderService);
})();

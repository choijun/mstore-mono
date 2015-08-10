(function () {
  'use strict';

  /* @ngInject */
  function OrderService(Storage, Cache) {
    this.repository = Storage.Orders;
    this.cartId = Cache.get('cartId');
  }

  OrderService.prototype.getOrders = function() {
    return this.repository.query().$promise;
  };

  OrderService.prototype.previewOrder = function() {
    return this.repository.get({ cartId: this.cartId }).$promise;
  };

  OrderService.prototype.placeOrder = function(shippingAddressId, billingAddressId) {
    return this.repository.put({ shippingAddressId: shippingAddressId, billingAddressId: billingAddressId }).$promise;
  };

  angular.module('mstore').service('OrderService', OrderService);
})();

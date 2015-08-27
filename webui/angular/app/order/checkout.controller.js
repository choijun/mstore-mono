(function () {
  'use strict';

  /* @ngInject */
  function CheckoutController(OrderService, Cache, $rootScope, $modal) {
    this.orderService = OrderService;
    this.cache = Cache;
    this.$rootScope = $rootScope;
    this.$modal = $modal;
    this.order = { details: [] };
    
    if (this.cache.get('loginUser')) {
      this.previewOrder();
    } else {
      this.$rootScope.$broadcast('login', this.previewOrder.bind(this));
    }
  }

  CheckoutController.prototype.previewOrder = function() {
    this.orderService.previewOrder()
    .then(function(response) { this.order = response.data; }.bind(this));
  };

  CheckoutController.prototype.placeOrder = function() {
    this.orderService.placeOrder(this.order.shippingAddressId, this.order.billingAddressId)
    .then(function(response) {
      this.orderId = response.data;
      this.cache.remove('cartId');
      this.$rootScope.$broadcast('updateCart');
      this.$modal.open({
        animation: true,
        templateUrl: 'orderResultMessage.html',
        controller: 'OrderResultModalController as mctrl',
        resolve: {
          orderId: function() { return this.orderId; }.bind(this)
        }
      });
    }.bind(this));
  };
  
  angular.module('mstore.order').controller('CheckoutController', CheckoutController);
})();

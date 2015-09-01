(function () {
  'use strict';

  /* @ngInject */
  function CheckoutController(OrderService, CacheService, $rootScope, $modal) {
    this.orderService = OrderService;
    this.cacheService = CacheService;
    this.$rootScope = $rootScope;
    this.$modal = $modal;
    this.order = { details: [] };
    
    if (this.cacheService.get('loginUser')) {
      this.previewOrder();
    } else {
      this.$rootScope.$broadcast('login', this.previewOrder.bind(this));
    }
  }

  CheckoutController.prototype.previewOrder = function() {
    this.orderService.previewOrder()
    .then(function(response) { this.data = response.data; }.bind(this));
  };

  CheckoutController.prototype.placeOrder = function() {
    this.orderService.placeOrder(this.data.shippingAddressId, this.data.billingAddressId)
    .then(function(response) {
      this.orderId = response.data;
      this.cacheService.remove('cartId');
      this.$rootScope.$broadcast('updateCart');
      this.$modal.open({
        animation: true,
        templateUrl: 'app/common/order-result/order-result.html',
        controller: 'OrderResultController as orderResult',
        resolve: {
          orderId: function() { return this.orderId; }.bind(this)
        }
      });
    }.bind(this));
  };
  
  angular.module('mstore').controller('CheckoutController', CheckoutController);
})();
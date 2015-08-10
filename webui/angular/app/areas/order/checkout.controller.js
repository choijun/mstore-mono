(function () {
  'use strict';

  angular.module('mstore').controller('CheckoutController', CheckoutController);

  /* @ngInject */
  function CheckoutController(OrderService, Cache, PubSub, $modal) {
    this.orderService = OrderService;
    this.cache = Cache;
    this.pubsub = PubSub;
    this.modalDialog = $modal;
    this.order = {
      details: []
    };
    if (Cache.get('loginUser')) {
      this.previewOrder();
    } else {
      PubSub.publish('login');
    }
  }

  CheckoutController.prototype.previewOrder = function() {
    this.orderService.previewOrder()
    .then(function(response) {
      this.order = response;
    }.bind(this));
  };

  CheckoutController.prototype.placeOrder = function() {
    this.orderService.placeOrder(this.order.shippingAddressId, this.order.billingAddressId)
    .then(function(response) {
      this.orderId = response.orderId;
      this.cache.remove('cartId');
      this.pubsub.publish('updateCart');
      this.modalDialog.open({
        animation: true,
        templateUrl: 'orderResultMessage.html',
        controller: ModalInstanceController,
        controllerAs: 'mctrl',
        resolve: {
          orderId: function() { return this.orderId; }.bind(this)
        }
      });
    }.bind(this));
  };

  /* @ngInject */
  function ModalInstanceController($modalInstance, $location, orderId) {
    this.orderId = orderId;
    this.modalInstance = $modalInstance;
    this.location = $location;
  }

  ModalInstanceController.prototype.ok = function() {
    this.modalInstance.close();
    this.location.path('/');
  };
})();

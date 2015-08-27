'use strict';

export default class CheckoutController {
  /* @ngInject */
  constructor(OrderService, Cache, $rootScope, $modal) {
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

  previewOrder() {
    this.orderService.previewOrder().then(response => this.order = response.data);
  }

  placeOrder() {
    this.orderService.placeOrder(this.order.shippingAddressId, this.order.billingAddressId)
    .then(response => {
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
    });
  }
}

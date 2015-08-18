'use strict';

export default class CheckoutController {
  /* @ngInject */
  constructor(OrderService, Cache, PubSub, $modal) {
    this.orderService = OrderService;
    this.cache = Cache;
    this.pubsub = PubSub;
    this.modalDialog = $modal;
    this.order = { details: [] };
    if (Cache.get('loginUser')) {
      this.previewOrder();
    } else {
      PubSub.publish('login');
    }
  }

  previewOrder() {
    this.orderService.previewOrder().then(response => this.order = response);
  }

  placeOrder() {
    this.orderService.placeOrder(this.order.shippingAddressId, this.order.billingAddressId)
    .then(response => {
      this.orderId = response.orderId;
      this.cache.remove('cartId');
      this.pubsub.publish('updateCart');
      this.modalDialog.open({
        animation: true,
        templateUrl: 'orderResultMessage.html',
        controller: 'OrderResultModalController  as mctrl',
        resolve: {
          orderId: function() { return this.orderId; }.bind(this)
        }
      });
    });
  }
}

'use strict';

export default class CheckoutController {
  /* @ngInject */
  constructor(OrderService, CacheService, $rootScope, $modal, toCurrency) {
    this.orderService = OrderService;
    this.cacheService = CacheService;
    this.$rootScope = $rootScope;
    this.$modal = $modal;
    this.toCurrency = toCurrency;
    this.data = { details: [] };
    
    if (this.cacheService.get('loginUser')) {
      this.previewOrder();
    } else {
      this.$rootScope.$broadcast('login', this.previewOrder.bind(this));
    }
  }

  previewOrder() {
    this.orderService.previewOrder().then(response => this.data = response.data);
  }

  placeOrder() {
    this.orderService.placeOrder(this.data.shippingAddressId, this.data.billingAddressId)
    .then(response => {
      this.orderId = response.data;
      this.cacheService.remove('cartId');
      this.$rootScope.$broadcast('updateCart');
      this.$modal.open({
        animation: true,
        templateUrl: 'app/components/order-result/order-result.html',
        controller: 'OrderResultController as orderResult',
        resolve: {
          orderId: () => { return this.orderId; }
        }
      });
    });
  }
}
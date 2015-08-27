'use strict';

export default class OrderService {
  /* @ngInject */
  constructor($http, Cache) {
    this.$http = $http;
    this.cache = Cache;
  }

  getOrders() {
    return this.$http.get('api/orders');
  }

  previewOrder() {
    return this.$http.get(`api/orders/preview-order?cartId=${this.cache.get('cartId')}`);
  }

  placeOrder(shippingAddressId, billingAddressId) {
    return this.$http({
      url: `api/orders?shippingAddressId=${shippingAddressId}&billingAddressId=${billingAddressId}`,
      method: 'PUT',
      transformResponse: response => response
    });
  }
}

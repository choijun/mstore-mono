'use strict';

export default class OrderService {
  /* @ngInject */
  constructor(Storage, Cache) {
    this.repository = Storage.Orders;
    this.cartId = Cache.get('cartId');
  }

  getOrders() {
    return this.repository.query().$promise;
  }

  previewOrder() {
    return this.repository.get({ cartId: this.cartId }).$promise;
  }

  placeOrder(shippingAddressId, billingAddressId) {
    return this.repository.put({ shippingAddressId: shippingAddressId, billingAddressId: billingAddressId }).$promise;
  }
}

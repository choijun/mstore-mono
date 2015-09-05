'use strict';
export default class OrdersController {
  /* @ngInject */
  constructor(OrderService, toCurrency) {
    OrderService.getOrders().then(response => this.data = response.data);
    this.toCurrency = toCurrency;
    this.formatDate = orderDate => (new Date(orderDate)).toLocaleDateString('en-US');
  }
}
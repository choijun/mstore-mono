'use strict';
export default class OrderController {
  /* @ngInject */
  constructor(OrderService) {
    OrderService.getOrders().then(response => this.orders = response);
  }
}

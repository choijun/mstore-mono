'use strict';
export default class OrdersController {
  /* @ngInject */
  constructor(OrderService) {
    OrderService.getOrders().then(response => this.data = response.data);
  }
}
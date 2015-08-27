'use strict';
/* global angular */

import OrderService from './order.service';
import OrderController from './order.controller';
import CheckoutController from './checkout.controller';
import OrderAddress from './order-address.directive';
import OrderResultModalController from './order-result-modal.controller';
import {commonModule} from './../common/common.module';

export var orderModule = angular.module('mstore.order', ['ngRoute', 'ui.bootstrap.tpls', 'ui.bootstrap.modal', 'mstore.common'])
.controller('CheckoutController', CheckoutController)
.controller('OrderResultModalController', OrderResultModalController)
.directive('orderAddress', () => new OrderAddress())
.service('OrderService', OrderService)
.controller('OrderController', OrderController)
.config(/* @ngInject */($routeProvider) => {
  $routeProvider
  .when('/checkout', {
    templateUrl: 'app/order/checkout.tpl.html',
    controller: 'CheckoutController as ctrl'
  })
  .when('/orders', {
    templateUrl: 'app/order/orders.tpl.html',
    controller: 'OrderController as ctrl'
  });
});
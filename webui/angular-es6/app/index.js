'use strict';
/* global angular */

import {coreModule} from './core/core.module';
import {productModule} from './product/product.module';
import {cartModule} from './cart/cart.module';
import {orderModule} from './order/order.module';

angular.module('mstore', ['mstore.core', 'mstore.product', 'mstore.cart', 'mstore.order'])
.config(/* @ngInject */($compileProvider) => {
  // disable debug info
  $compileProvider.debugInfoEnabled(false);
});

angular.element(document).ready(() => {
  angular.bootstrap(document, ['mstore']);
});
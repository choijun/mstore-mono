'use strict';
/* global angular */

import ProductImage from './product-image/product-image';
import CartEmpty from './cart-empty/cart-empty';
import OrderAddress from './order-address/order-address';
import CartSummary from './cart-summary/cart-summary';
import Account from './account/account';
import Navbar from './navbar/navbar';

export const commonModule = angular.module('mstore.common', [
  // 3rd Party Modules
  'ui.bootstrap.tpls',
  'ui.bootstrap.modal',
  'ui.bootstrap.dropdown'
])
.directive('productImage', () => new ProductImage())
.directive('cartEmpty', () => new CartEmpty())
.directive('orderAddress', () => new OrderAddress())
.directive('cartSummary', () => new CartSummary())
.directive('account', () => new Account())
.directive('navbar', () => new Navbar());
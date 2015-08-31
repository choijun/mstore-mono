'use strict';
/* global angular */

import ToCurrency from './to-currency/to-currency';
import OrderResultController from './order-result/order-result';
import ProductImage from './product-image/product-image';
import CartEmpty from './cart-empty/cart-empty';
import OrderAddress from './order-address/order-address';
import CartSummary from './cart-summary/cart-summary';
import Account from './account/account';
import Header from './header/header';
import Footer from './footer/footer';

export var commonModule = angular.module('mstore.common', [
  'ui.bootstrap.tpls',
  'ui.bootstrap.modal',
  'ui.bootstrap.dropdown'
])
.filter('toCurrency', () => new ToCurrency())
.controller('OrderResultController', OrderResultController)
.directive('productImage', () => new ProductImage())
.directive('cartEmpty', () => new CartEmpty())
.directive('orderAddress', () => new OrderAddress())
.directive('cartSummary', () => new CartSummary())
.directive('account', () => new Account())
.directive('header', () => new Header())
.directive('footer', () => new Footer());
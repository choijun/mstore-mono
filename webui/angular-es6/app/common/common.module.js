'use strict';
/* global angular */

import OrderResultController from './order-result/order-result.controller';
import ProductImage from './product-image/product-image.directive';
import CartEmpty from './cart-empty/cart-empty.directive';
import OrderAddress from './order-address/order-address.directive';
import CartSummary from './cart-summary/cart-summary.directive';
import Account from './account/account.directive';
import Header from './header/header.directive';
import Footer from './footer/footer.directive';

export const commonModule = angular.module('mstore.common', [
  // 3rd Party Modules
  'ui.bootstrap.tpls',
  'ui.bootstrap.modal',
  'ui.bootstrap.dropdown'
])
.value('toCurrency', amount => ('$ ' + (amount / 100).toFixed(2)))
.controller('OrderResultController', OrderResultController)
.directive('productImage', () => new ProductImage())
.directive('cartEmpty', () => new CartEmpty())
.directive('orderAddress', () => new OrderAddress())
.directive('cartSummary', () => new CartSummary())
.directive('account', () => new Account())
.directive('header', () => new Header())
.directive('footer', () => new Footer());
'use strict';

import Routes from './bootstrap/routes';
import Header from './shared/header/header';
import Footer from './shared/footer/footer';
import Storage from './bootstrap/storage';
import Cache from './bootstrap/cache';
import PubSub from './bootstrap/pubsub';
import ProductService from './areas/product/product.service';
import CartService from './areas/cart/cart.service';
import ProductController from './areas/product/product.controller';
import ProductImageController from './areas/product/product-image';
import ProductImage from './areas/product/product-image';
import ToCurrency from './shared/to-currency.filter';
import CartSummaryController from './shared/cart-summary/cart-summary.controller';
import CartSummary from './shared/cart-summary/cart-summary';
import CartController from './areas/cart/cart.controller';
import OrderService from './areas/order/order.service';
import CheckoutController from './areas/order/checkout.controller';
import OrderResultModalController from './areas/order/order-result-modal.controller';
import AccountService from './shared/account/account.service';
import AccountController from './shared/account/account.controller';
import Account from './shared/account/account';
import OrderAddressController from './areas/order/order-address';
import OrderAddress from './areas/order/order-address';
import OrderController from './areas/order/order.controller';

angular.module('mstore', ['ngRoute', 'ngResource', 'ui.bootstrap.tpls', 'ui.bootstrap.dropdown', 'ui.bootstrap.modal'])
.directive('header', () => new Header())
.directive('footer', () => new Footer())
.service('Storage', Storage)
.service('Cache', Cache)
.service('PubSub', PubSub)
.service('ProductService', ProductService)
.service('CartService', CartService)
.controller('ProductController', ProductController)
.controller('ProductImageController', ProductImageController)
.directive('productImage', () => new ProductImage())
.filter('toCurrency', () => new ToCurrency())
.controller('CartSummaryController', CartSummaryController)
.directive('cartSummary', () => new CartSummary())
.controller('CartController', CartController)
.service('OrderService', OrderService)
.controller('CheckoutController', CheckoutController)
.controller('OrderResultModalController', OrderResultModalController)
.service('AccountService', AccountService)
.controller('AccountController', AccountController)
.directive('account', () => new Account())
.controller('OrderAddressController', OrderAddressController)
.directive('orderAddress', () => new OrderAddress())
.controller('OrderController', OrderController)
.config(Routes);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['mstore']);
});

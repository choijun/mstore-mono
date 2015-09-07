'use strict';
/* global angular */

import {servicesModule} from './services/services'; // jshint ignore:line
import {commonModule} from './common/common'; // jshint ignore:line
import HomeController from './components/home/home';
import ProductsController from './components/products/products';
import ProductController from './components/product/product';
import CartController from './components/cart/cart';
import CheckoutController from './components/checkout/checkout';
import OrdersController from './components/orders/orders';
import OrderResultController from './components/order-result/order-result';

class AppController {
  /* @ngInject */
  constructor($router) {
    $router.config([
      { path: '/home', component: 'home' },
      { path: '/products', component: 'products' },
      { path: '/products/:id', component: 'product' },
      { path: '/cart', component: 'cart' },
      { path: '/checkout', component: 'checkout' },
      { path: '/orders', component: 'orders' },
      { path: '/', redirectTo: '/home' }
    ]);
  }
}

angular.module('mstore', [
  // Angular modules
  'ngNewRouter',
  // Custom modules
  'mstore.services',
  'mstore.common'
])
.value('toCurrency', amount => ('$ ' + (amount / 100).toFixed(2)))
.controller('AppController', AppController)
.controller('HomeController', HomeController)
.controller('ProductsController', ProductsController)
.controller('ProductController', ProductController)
.controller('CartController', CartController)
.controller('CheckoutController', CheckoutController)
.controller('OrdersController', OrdersController)
.controller('OrderResultController', OrderResultController)
.config(/* @ngInject */($compileProvider, $componentLoaderProvider) => {
  // disable debug info
  $compileProvider.debugInfoEnabled(false);
  // set templates path
  $componentLoaderProvider.setTemplateMapping(name => `app/components/${name}/${name}.html`);
});
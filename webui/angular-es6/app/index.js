'use strict';
/* global angular */

import {servicesModule} from './services/services.module'; // jshint ignore:line
import {commonModule} from './common/common.module'; // jshint ignore:line
import AppController from './app.controller';
import HomeController from './components/home/home';
import ProductsController from './components/products/products';
import ProductController from './components/product/product';
import CartController from './components/cart/cart';
import CheckoutController from './components/checkout/checkout';
import OrdersController from './components/orders/orders';

angular.module('mstore', [
  'ngNewRouter',
  'mstore.services',
  'mstore.common'
])
.controller('AppController', AppController)
.controller('HomeController', HomeController)
.controller('ProductsController', ProductsController)
.controller('ProductController', ProductController)
.controller('CartController', CartController)
.controller('CheckoutController', CheckoutController)
.controller('OrdersController', OrdersController)
.config(/* @ngInject */($compileProvider, $componentLoaderProvider) => {
  // disable debug info
  $compileProvider.debugInfoEnabled(false);
  // set templates path
  $componentLoaderProvider.setTemplateMapping(name => `app/components/${name}/${name}.html`);
});
'use strict';
/* global angular */

import {servicesModule} from './services/services.module'; // jshint ignore:line
import {commonModule} from './common/common.module'; // jshint ignore:line
import AppController from './app.controller';
import HomeController from './components/home/home.controller';
import ProductsController from './components/products/products.controller';
import ProductController from './components/product/product.controller';
import CartController from './components/cart/cart.controller';
import CheckoutController from './components/checkout/checkout.controller';
import OrdersController from './components/orders/orders.controller';

angular.module('mstore', [
  // Angular modules
  'ngNewRouter',
  // Custom modules
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
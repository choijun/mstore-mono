'use strict';
/* global angular */

import ProductService from './product.service';
import ProductController from './product.controller';
import ProductImage from './product-image.directive';
import {commonModule} from './../common/common.module';

export var productModule = angular.module('mstore.product', ['ngRoute', 'mstore.common'])
.service('ProductService', ProductService)
.controller('ProductController', ProductController)
.directive('productImage', () => new ProductImage())
.config(/* @ngInject */($routeProvider) => {
  $routeProvider
  .when('/products', {
    templateUrl: 'app/product/products.tpl.html',
    controller: 'ProductController as ctrl'
  })
  .when('/products/:id', {
    templateUrl: 'app/product/product.tpl.html',
    controller: 'ProductController as ctrl'
  });
});
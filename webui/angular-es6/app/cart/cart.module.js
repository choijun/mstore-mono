'use strict';
/* global angular */

import CartService from './cart.service';
import CartController from './cart.controller';
import {commonModule} from './../common/common.module';

export var cartModule = angular.module('mstore.cart', ['ngRoute', 'mstore.common'])
.controller('CartController', CartController)
.service('CartService', CartService)
.config(/* @ngInject */($routeProvider) => {
  $routeProvider
  .when('/cart', {
    templateUrl: 'app/cart/cart.tpl.html',
    controller: 'CartController as ctrl'
  });
});
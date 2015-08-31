'use strict';
/* global angular */

import CacheService from './cache.service';
import AccountService from './account.service';
import ProductService from './product.service';
import CartService from './cart.service';
import OrderService from './order.service';

export var servicesModule = angular.module('mstore.services', [])
.service('CacheService', CacheService)
.service('AccountService', AccountService)
.service('ProductService', ProductService)
.service('CartService', CartService)
.service('OrderService', OrderService);
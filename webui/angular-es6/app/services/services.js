'use strict';
/* global angular */

import CacheService from './cache';
import AccountService from './account';
import ProductService from './product';
import CartService from './cart';
import OrderService from './order';

export const servicesModule = angular.module('mstore.services', [])
.service('CacheService', CacheService)
.service('AccountService', AccountService)
.service('ProductService', ProductService)
.service('CartService', CartService)
.service('OrderService', OrderService);
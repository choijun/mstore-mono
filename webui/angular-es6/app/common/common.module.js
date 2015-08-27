'use strict';
/* global angular */

import Cache from './cache';
import ToCurrency from './to-currency.filter';

export var commonModule = angular.module('mstore.common', [])
.service('Cache', Cache)
.filter('toCurrency', () => new ToCurrency());
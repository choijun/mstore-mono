'use strict';
/* global angular */

import CartSummaryService from './cart-summary/cart-summary.service';
import CartSummaryController from './cart-summary/cart-summary.controller';
import CartSummary from './cart-summary/cart-summary.directive';
import AccountService from './account/account.service';
import AccountController from './account/account.controller';
import Account from './account/account.directive';
import Header from './header/header.directive';
import Footer from './footer/footer.directive';

export var coreModule = angular.module('mstore.core', ['ngRoute', 'ui.bootstrap.dropdown'])
.service('CartSummaryService', CartSummaryService)
.controller('CartSummaryController', CartSummaryController)
.directive('cartSummary', () => new CartSummary())
.service('AccountService', AccountService)
.controller('AccountController', AccountController)
.directive('account', () => new Account())
.directive('header', () => new Header())
.directive('footer', () => new Footer())
.config(/* @ngInject */($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'app/core/home.tpl.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
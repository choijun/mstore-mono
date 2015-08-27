(function () {
  'use strict';

  angular.module('mstore.cart', ['ngRoute', 'mstore.common'])
  .config(/* @ngInject */function($routeProvider) {
    $routeProvider
    .when('/cart', {
      templateUrl: 'app/cart/cart.tpl.html',
      controller: 'CartController as ctrl'
    });
  });
})();
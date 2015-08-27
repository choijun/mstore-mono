(function () {
  'use strict';
  
  angular.module('mstore.order', ['ngRoute', 'ui.bootstrap.tpls', 'ui.bootstrap.modal', 'mstore.common'])
  .config(/* @ngInject */function($routeProvider) {
    $routeProvider
    .when('/checkout', {
      templateUrl: 'app/order/checkout.tpl.html',
      controller: 'CheckoutController as ctrl'
    })
    .when('/orders', {
      templateUrl: 'app/order/orders.tpl.html',
      controller: 'OrderController as ctrl'
    });
  });
})();
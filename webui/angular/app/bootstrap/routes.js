(function () {
  'use strict';

  /* @ngInject */
  angular.module('mstore').config(function ($routeProvider, $compileProvider) {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
    $routeProvider
    .when('/', {
      templateUrl: 'app/areas/home/home.tpl.html'
    })
    .when('/products', {
      templateUrl: 'app/areas/product/products.tpl.html',
      controller: 'ProductController as ctrl'
    })
    .when('/products/:id', {
      templateUrl: 'app/areas/product/product.tpl.html',
      controller: 'ProductController as ctrl'
    })
    .when('/cart', {
      templateUrl: 'app/areas/cart/cart.tpl.html',
      controller: 'CartController as ctrl'
    })
    .when('/checkout', {
      templateUrl: 'app/areas/order/checkout.tpl.html',
      controller: 'CheckoutController as ctrl'
    })
    .when('/orders', {
      templateUrl: 'app/areas/order/orders.tpl.html',
      controller: 'OrderController as ctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
})();
